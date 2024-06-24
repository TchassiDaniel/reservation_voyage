"use client";
import { useState, useEffect } from "react";
import styles from "./Historique.module.css";
import { constantes } from "./constante"; // Assurez-vous de définir et importer les constantes appropriées

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://${constantes.hostbackend}/api/reservation/allByUser/${constantes.idUtilisateur}`);
        const data = await response.json();
        // Assurez-vous que data est bien un tableau avant de le définir
        setReservations(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations(prevReservations => 
        prevReservations.map((reservation) => {
          if (reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" && reservation.timerDate > 0) {
            return { ...reservation, timerDate: reservation.timerDate - 1 };
          }
          if (reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" && reservation.timerDate === 0) {
            return { ...reservation, statutReservation: "annulé" };
          }
          return reservation;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePay = (id) => {
    setReservations(prevReservations => 
      prevReservations.map((reservation) => {
        if (reservation.idReservation === id) {
        return { ...reservation, statutReservation: "CONFIRME", timerDate: 0 };
        }
        return reservation;
      })
    );
  };

  const handleCancel = (id) => {
    setReservations(prevReservations => 
      prevReservations.map((reservation) => {
        if (reservation.idReservation === id) {
          return { ...reservation, statutReservation: "ANNULE", timerDate: 0 };
        }
        return reservation;
      })
    );
  };

  const handleRowClick = async (reservation) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(`http://${constantes.hostbackend}/api/passager/allByReservation/${reservation.idReservation}`);
      const data = await response.json();
      setSelectedReservation({ ...reservation, details: data.data });
    } catch (error) {
      console.error("Erreur lors de la récupération des détails des passagers:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getStatusClass = (status) => {
    if (status === "CONFIRME") return styles.confirmed;
    if (status === "ANNULE") return styles.cancelled;
    if (status === "EN_ATTENTE_DE_CONFIRMATION") return styles.pending;
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date réservation</th>
            <th>Nombre passager</th>
            <th>Prix total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr
              key={reservation.idReservation}
              onClick={() => handleRowClick(reservation)}
              className={styles.tableRow}
            >
              <td>{new Date(reservation.dateReservation).toLocaleDateString()}</td>
              <td>{reservation.nbrePassager}</td>
              <td>{reservation.prixTotal}F CFA</td>
              <td className={getStatusClass(reservation.statutReservation)}>
                {reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" ? (
                  <>
                    {reservation.statutReservation} - {formatTime(reservation.timerDate)}
                    <button
                      className={styles.payButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePay(reservation.idReservation);
                      }}
                    >
                      Payer
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel(reservation.idReservation);
                      }}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  reservation.statutReservation
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReservation && (
        <div className={styles.detailsContainer}>
          <h2>Détails de la réservation</h2>
          <p>Date de réservation: {new Date(selectedReservation.dateReservation).toLocaleDateString()}</p>
          <p>Nombre de passagers: {selectedReservation.nbrePassager}</p>
          <p>Prix total: {selectedReservation.prixTotal}F CFA</p>
          <p>Statut: {selectedReservation.statutReservation}</p>
          <h3>Passagers:</h3>
          {loadingDetails ? (
            <p>Chargement des détails...</p>
          ) : (
            <ul>
              {selectedReservation.details.map((passenger, index) => (
                <li key={index}>
                  {passenger.nom} {passenger.prenom} ({passenger.type}, {passenger.genre})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
