// ReservationsHistory.tsx
"use client";
import { useState, useEffect } from "react";
import styles from "./Historique.module.css";
import { constantes } from "./constante"; // Assurez-vous de définir et importer les constantes appropriées

const ReservationsHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [editing, setEditing] = useState(false);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://${constantes.hostbackend}/api/reservation/allByUser/${constantes.idUtilisateur}`
        );
        const data = await response.json();
        setReservations(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réservations:",
          error
        );
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
            return { ...reservation, statutReservation: "annulé" };
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
          return {
            ...reservation,
            statutReservation: "CONFIRME",
            timerDate: 0,
          };
        }
        return reservation;
      })
    );
  };

  const handleCancel = (id) => {
    setReservations((prevReservations) =>
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
      const response = await fetch(
        `http://${constantes.hostbackend}/api/passager/allByReservation/${reservation.idReservation}`
      );
      const data = await response.json();
      setSelectedReservation({ ...reservation, details: data.data });
      setPassengers(data.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails des passagers:",
        error
      );
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

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://${constantes.hostbackend}/api/reservation/updatePassengers/${selectedReservation.idReservation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ passengers }),
        }
      );

      if (response.ok) {
        alert("Réservation mise à jour avec succès!");
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.idReservation === selectedReservation.idReservation
              ? { ...reservation, details: passengers }
              : reservation
          )
        );
        setSelectedReservation(null);
        setEditing(false);
      } else {
        alert("Erreur lors de la mise à jour de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
    }
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
              <td>
                {new Date(reservation.dateReservation).toLocaleDateString()}
              </td>
              <td>{reservation.nbrePassager}</td>
              <td>{reservation.prixTotal}F CFA</td>
              <td className={getStatusClass(reservation.statutReservation)}>
                {reservation.statutReservation ===
                "EN_ATTENTE_DE_CONFIRMATION" ? (
                  <>
                    {reservation.statutReservation} -{" "}
                    {formatTime(reservation.timerDate)}
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
          <p>
            Date de réservation:{" "}
            {new Date(selectedReservation.dateReservation).toLocaleDateString()}
          </p>
          <p>Nombre de passagers: {selectedReservation.nbrePassager}</p>
          <p>Prix total: {selectedReservation.prixTotal}F CFA</p>
          <p>Statut: {selectedReservation.statutReservation}</p>
          <h3>Passagers:</h3>
          {loadingDetails ? (
            <p>Chargement des détails...</p>
          ) : (
            <>
              {editing ? (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col space-y-4"
                >
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border border-gray-500 p-4 rounded-md"
                    >
                      <h2 className="mb-2">
                        <b>PASSAGER {index + 1}</b>
                      </h2>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor={`nom-${index}`}>
                          <b>Nom de famille:</b>
                        </label>
                        <input
                          type="text"
                          id={`nom-${index}`}
                          className="p-2 border border-gray-300 rounded-md"
                          value={passenger.nom}
                          onChange={(event) =>
                            handleInputChange(index, "nom", event.target.value)
                          }
                          required
                        />
                        <label htmlFor={`prenom-${index}`}>
                          <b>Prénom:</b>
                        </label>
                        <input
                          type="text"
                          id={`prenom-${index}`}
                          className="p-2 border border-gray-300 rounded-md"
                          value={passenger.prenom}
                          onChange={(event) =>
                            handleInputChange(
                              index,
                              "prenom",
                              event.target.value
                            )
                          }
                          required
                        />
                        <label htmlFor={`type-${index}`}>
                          <b>Type:</b>
                        </label>
                        <select
                          id={`type-${selectedPassengerIndex}`}
                          className={styles.inputStyle}
                          value={passengers[selectedPassengerIndex].type}
                          onChange={(event) =>
                            handleInputChange(
                              selectedPassengerIndex,
                              "type",
                              event.target.value
                            )
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="Adulte">Adulte</option>
                          <option value="Enfant">Enfant</option>
                          <option value="Bébé">Handicapé</option>
                        </select>
                        <label htmlFor={`genre-${index}`}>
                          <b>Genre:</b>
                        </label>
                        <input
                          type="text"
                          id={`genre-${index}`}
                          className="p-2 border border-gray-300 rounded-md"
                          value={passenger.genre}
                          onChange={(event) =>
                            handleInputChange(
                              index,
                              "genre",
                              event.target.value
                            )
                          }
                          required
                        />
                        {/* Add other fields similar to the one above */}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Enregistrer les modifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                <ul>
                  {selectedReservation.details.map((passenger, index) => (
                    <li key={index}>
                      {passenger.nom} {passenger.prenom} ({passenger.type},{" "}
                      {passenger.genre})
                    </li>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Modifier les passagers
                  </button>
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationsHistory;
