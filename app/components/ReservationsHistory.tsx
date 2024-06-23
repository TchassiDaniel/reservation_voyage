import { useState, useEffect } from "react";
import styles from "./Historique.module.css";

const ReservationTable = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      date: "2024-06-23",
      passengers: 2,
      total: 120.0,
      status: "en attente",
      timer: 172800,
      details: [
        { nom: "Dupont", prenom: "Jean", type: "adulte", genre: "masculin" },
        { nom: "Dupont", prenom: "Marie", type: "adulte", genre: "féminin" },
      ],
    },
    {
      id: 2,
      date: "2024-06-24",
      passengers: 1,
      total: 50.0,
      status: "confirmé",
      timer: 0,
      details: [
        { nom: "Martin", prenom: "Pierre", type: "adulte", genre: "masculin" },
      ],
    },
    {
      id: 3,
      date: "2024-06-25",
      passengers: 3,
      total: 180.0,
      status: "annulé",
      timer: 0,
      details: [
        { nom: "Durand", prenom: "Alice", type: "enfant", genre: "féminin" },
        { nom: "Durand", prenom: "Luc", type: "adulte", genre: "masculin" },
        { nom: "Durand", prenom: "Eve", type: "adulte", genre: "féminin" },
      ],
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations(
        reservations.map((reservation) => {
          if (reservation.status === "en attente" && reservation.timer > 0) {
            return { ...reservation, timer: reservation.timer - 1 };
          }
          if (reservation.status === "en attente" && reservation.timer === 0) {
            return { ...reservation, status: "annulé" };
          }
          return reservation;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [reservations]);

  const handlePay = (id) => {
    setReservations(
      reservations.map((reservation) => {
        if (reservation.id === id) {
          return { ...reservation, status: "confirmé", timer: 0 };
        }
        return reservation;
      })
    );
  };

  const handleCancel = (id) => {
    setReservations(
      reservations.map((reservation) => {
        if (reservation.id === id) {
          return { ...reservation, status: "annulé", timer: 0 };
        }
        return reservation;
      })
    );
  };

  const handleRowClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getStatusClass = (status) => {
    if (status === "confirmé") return styles.confirmed;
    if (status === "annulé") return styles.cancelled;
    if (status === "en attente") return styles.pending;
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
              key={reservation.id}
              onClick={() => handleRowClick(reservation)}
              className={styles.tableRow}
            >
              <td>{reservation.date}</td>
              <td>{reservation.passengers}</td>
              <td>{reservation.total}€</td>
              <td className={getStatusClass(reservation.status)}>
                {reservation.status === "en attente" ? (
                  <>
                    {reservation.status} - {formatTime(reservation.timer)}
                    <button
                      className={styles.payButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePay(reservation.id);
                      }}
                    >
                      Payer
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel(reservation.id);
                      }}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  reservation.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReservation && (
        <div className={styles.detailsContainer}>
          <h2>Détails de la réservation</h2>
          <p>Date de réservation: {selectedReservation.date}</p>
          <p>Nombre de passagers: {selectedReservation.passengers}</p>
          <p>Prix total: {selectedReservation.total}€</p>
          <p>Statut: {selectedReservation.status}</p>
          <h3>Passagers:</h3>
          <ul>
            {selectedReservation.details.map((passenger, index) => (
              <li key={index}>
                {passenger.nom} {passenger.prenom} ({passenger.type},{" "}
                {passenger.genre})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
