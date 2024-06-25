"use client";
import { useState, useEffect } from "react";
import ReservationDetails from "./ReservationDetails";
import { constantes } from "../constante"; // Assurez-vous de définir et importer les constantes appropriées
import  "../Historique.module.css";

const ReservationsHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://${constantes.hostbackend}/api/reservation/allByUser/${constantes.idUtilisateur}`
        );
        const data = await response.json();
        setReservations(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations((prevReservations) =>
        prevReservations.map((reservation) => {
          if (
            reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" &&
            reservation.timerDate > 0
          ) {
            return { ...reservation, timerDate: reservation.timerDate - 1 };
          }
          if (
            reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" &&
            reservation.timerDate === 0
          ) {
            return { ...reservation, statutReservation: "ANNULÉ" };
          }
          return reservation;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePay = (id) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) => {
        if (reservation.idReservation === id) {
          return { ...reservation, statutReservation: "CONFIRMÉ", timerDate: 0 };
        }
        return reservation;
      })
    );
  };

  const handleCancel = (id) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) => {
        if (reservation.idReservation === id) {
          return { ...reservation, statutReservation: "ANNULÉ", timerDate: 0 };
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
    if (status === "CONFIRMÉ") return "text-green-500";
    if (status === "ANNULÉ") return "text-red-500";
    if (status === "EN_ATTENTE_DE_CONFIRMATION") return "text-yellow-500";
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Date réservation</th>
            <th className="py-2">Nombre passager</th>
            <th className="py-2">Prix total</th>
            <th className="py-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={reservation.idReservation}
              onClick={() => handleRowClick(reservation)}
              className={`cursor-pointer hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="py-2 px-4">{new Date(reservation.dateReservation).toLocaleDateString()}</td>
              <td className="py-2 px-4">{reservation.nbrePassager}</td>
              <td className="py-2 px-4">{reservation.prixTotal}F CFA</td>
              <td className={`py-2 px-4 ${getStatusClass(reservation.statutReservation)}`}>
                {reservation.statutReservation === "EN_ATTENTE_DE_CONFIRMATION" ? (
                  <>
                    {reservation.statutReservation} - {formatTime(reservation.timerDate)}
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePay(reservation.idReservation);
                      }}
                    >
                      Payer
                    </button>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
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
        <ReservationDetails
        
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};

export default ReservationsHistory;
