"use client";
import { useState, useEffect } from "react";
import styles from "./booking.module.css";
import { constantes } from "./constante";
import Alert from "./Alert";

const BookingPage = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const handleShowPassengerForm = () => {
    setShowPassengerForm(true);
  };

  const [showPassengerForm, setShowPassengerForm] = useState(false);

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const [passengers, setPassengers] = useState([]);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
  const [flightPrice, setFlightPrice] = useState(0);

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    const newPassenger = {
      nom: "",
      prenom: "",
      age: "",
      type: "",
      genre: "",
      idNumber: "",
      poidsBagage: 0,
      nbreBagage: 0,
    };
    setPassengers([...passengers, newPassenger]);
    setSelectedPassengerIndex(passengers.length);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
    if (selectedPassengerIndex === index) {
      setSelectedPassengerIndex(null);
    } else if (selectedPassengerIndex > index) {
      setSelectedPassengerIndex(selectedPassengerIndex - 1);
    }
  };

  const handlePassengerSelect = (index) => {
    setSelectedPassengerIndex(index);
  };

  const calculateTotalBaggagePrice = () => {
    return passengers.reduce(
      (total, passenger) => total + passenger.nbreBagage * 1000,
      0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const passenger of passengers) {
      if (
        passenger.nom.trim() === "" ||
        passenger.prenom.trim() === "" ||
        !passenger.age ||
        !passenger.idNumber
      ) {
        alert(
          "Please fill in all required fields (Name, Last Name, Age, ID Number) for all passengers."
        );
        return;
      }
    }

    try {
      const totalBaggagePrice = calculateTotalBaggagePrice();
      const reservation = {
        dateReservation: new Date().toISOString(),
        nbrePassager: passengers.length,
        prixTotal: flightPrice * passengers.length + totalBaggagePrice,
        idUtilisateur: constantes.idUtilisateur,
        idVoyage: constantes.idVoyage,
      };
      console.log(reservation);
      const reservationResponse = await fetch(
        `http://${constantes.hostbackend}/api/reservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservation),
        }
      );

      if (!reservationResponse.ok) {
        throw new Error("Erreur lors de la création de la réservation");
      }

      const reservationData = await reservationResponse.json();
      const idReservation = reservationData.value;
      console.log(reservationData);
      console.log(idReservation);

      for (const passenger of passengers) {
        const passager = {
          nom: passenger.nom,
          prenom: passenger.prenom,
          type: passenger.type,
          genre: passenger.genre,
          age: parseInt(passenger.age),
          numPieceIdentification: passenger.idNumber,
          idReservation: idReservation,
        };
        console.log(passager);
        const passagerResponse = await fetch(
          `http://${constantes.hostbackend}/api/passager`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(passager),
          }
        );

        if (!passagerResponse.ok) {
          throw new Error("Erreur lors de la création du passager");
        }

        const passagerData = await passagerResponse.json();
        const idPassager = passagerData.value;
        console.log(idPassager);

        const bagage = {
          nbreBagage: passenger.nbreBagage,
          poids: passenger.poidsBagage,
          prix: passenger.nbreBagage * 1000,
          idPassager,
        };

        const bagageResponse = await fetch(
          `http://${constantes.hostbackend}/api/bagage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bagage),
          }
        );

        if (!bagageResponse.ok) {
          throw new Error("Erreur lors de la création des bagages");
        }
      }

      alert("Réservation créée avec succès!");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création de la réservation et des passagers");
    }
  };

  const fetchFlightPrice = async () => {
    try {
      const response = await fetch(
        `http://${constantes.hostbackend}/api/voyage/${constantes.idVoyage}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du prix du vol");
      }
      const data = await response.json();
      setFlightPrice(data.data.prix);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la récupération du prix du vol");
    }
  };

  useEffect(() => {
    fetchFlightPrice();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="w-1/2 p-4">
        <h1 className="text-center text-lg mb-4 text-blue-400">
          <b>Qui voyage ?</b>
        </h1>
        <div className="mb-4">
          <label htmlFor="totalPassengers" className="mr-2">
            Nombre total de passagers :
          </label>
          <input
            type="number"
            id="totalPassengers"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleShowPassengerForm}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            OK
          </button>
        </div>
        {showPassengerForm && (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {selectedPassengerIndex !== null && (
              <div
                className={`border border-gray-500 p-4 rounded-md shadow-md mb-4`}
              >
                <h2>
                  <b>PASSAGER {selectedPassengerIndex + 1}:</b>
                </h2>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`name-${selectedPassengerIndex}`}
                  >
                    <b>Nom de famille: </b>
                  </label>
                  <input
                    type="text"
                    id={`name-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].nom}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "nom",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`prenom-${selectedPassengerIndex}`}
                  >
                    <b>Prénom(s): </b>
                  </label>
                  <input
                    type="text"
                    id={`prenom-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].prenom}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "prenom",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`age-${selectedPassengerIndex}`}
                  >
                    <b>Age: </b>
                  </label>
                  <input
                    type="number"
                    id={`age-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].age}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "age",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`type-${selectedPassengerIndex}`}
                  >
                    <b>Type: </b>
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
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`genre-${selectedPassengerIndex}`}
                  >
                    <b>Genre: </b>
                  </label>
                  <select
                    id={`genre-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].genre}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "genre",
                        event.target.value
                      )
                    }
                  >
                    <option value="">Select Genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`idNumber-${selectedPassengerIndex}`}
                  >
                    <b>Numéro d'identification: </b>
                  </label>
                  <input
                    type="text"
                    id={`idNumber-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].idNumber}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "idNumber",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`nbreBagage-${selectedPassengerIndex}`}
                  >
                    <b>Nombre de bagages: </b>
                  </label>
                  <input
                    type="number"
                    id={`nbreBagage-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].nbreBagage}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "nbreBagage",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label
                    className="block mb-2"
                    htmlFor={`poidsBagage-${selectedPassengerIndex}`}
                  >
                    <b>Poids des bagages (kg): </b>
                  </label>
                  <input
                    type="number"
                    id={`poidsBagage-${selectedPassengerIndex}`}
                    className={styles.inputStyle}
                    value={passengers[selectedPassengerIndex].poidsBagage}
                    onChange={(event) =>
                      handleInputChange(
                        selectedPassengerIndex,
                        "poidsBagage",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}

            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded my-2"
              type="button"
              onClick={handleAddPassenger}
            >
              Ajouter un passager
            </button>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-2"
              type="submit"
            >
              Soumettre
            </button>
          </form>
        )}
      </div>

      <div className="w-1/2 p-4">
        <h2 className="text-lg text-center mb-4">
          <b>Liste des passagers</b>
        </h2>
        <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border py-2 px-4">Nom</th>
                <th className="border py-2 px-4">Prénom</th>
                <th className="border py-2 px-4">N_ carteID</th>
                <th className="border py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handlePassengerSelect(index)}
                >
                  <td className="border py-2 px-4">{passenger.nom}</td>
                  <td className="border py-2 px-4">{passenger.prenom}</td>
                  <td className="border py-2 px-4">{passenger.idNumber}</td>
                  <td className="border py-2 px-4 text-center">
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePassenger(index);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={handleCloseAlert}
          />
        )}
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold mb-4">Résumé</h2>
        <p className="mb-2">
          <b>Nombre total de passagers :</b> {passengers.length}
        </p>
        <p className="mb-2">
          <b>Nombre total de bagages :</b>{" "}
          {passengers.reduce(
            (total, passenger) => total + passenger.nbreBagage,
            0
          )}
        </p>
        <p className="mb-2">
          <b>Prix total du vol :</b> {flightPrice * passengers.length} F CFA
        </p>
        <p className="mb-2">
          <b>Prix total des bagages :</b> {calculateTotalBaggagePrice()} F CFA
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
