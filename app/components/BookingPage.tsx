"use client";
import { useState } from "react";
import styles from "./booking.module.css";
import { constantes } from "./constante";

const BookingPage = () => {
  const [passengers, setPassengers] = useState([
    {
      nom: "",
      prenom: "",
      age: "",
      type: "",
      genre: "",
      idNumber: "",
      poidsBagage: 0,
      nbreBagage: 0,
      prixBagage: 0,
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        nom: "",
        prenom: "",
        age: "",
        type: "",
        genre: "",
        idNumber: "",
        poidsBagage: 0,
        nbreBagage: 0,
        prixBagage: 0,
      },
    ]);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
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
      // Create reservation
      const reservation = {
        dateReservation: new Date().toISOString(),
        nbrePassager: passengers.length,
        prixTotal: passengers.reduce((total, p) => total +p.prixBagage || 0, 0),
        idUtilisateur: constantes.idUtilisateur, // Assurez-vous de définir idUtilisateur dans constantes
        idVoyage: constantes.idVoyage,
      };
      
      const reservationResponse = await fetch(`http://${constantes.hostbackend}/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!reservationResponse.ok) {
        throw new Error("Erreur lors de la création de la réservation");
      }

      const reservationData = await reservationResponse.json();
      const idReservation = reservationData.value;//.idReservation;
      console.log(idReservation);
      // Create passengers and bags
      for (const passenger of passengers) {
        const passager = {
          nom: passenger.nom,
          prenom: passenger.prenom,
          type: passenger.type,
          genre: passenger.genre,
          age: parseInt(passenger.age),
          NumPieceIdentification: passenger.idNumber,
          idReservation,
        };

        const passagerResponse = await fetch(`http://${constantes.hostbackend}/api/passager`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passager),
        });

        if (!passagerResponse.ok) {
          throw new Error("Erreur lors de la création du passager");
        }

        const passagerData = await passagerResponse.json();
        const idPassager = passagerData.value;//idPassager;
        console.log(idPassager);
        // Create baggage
        const bagage = {
          nbreBagage: passenger.nbreBagage,
          poids:passenger.poidsBagage,
          prix: passenger.prixBagage,
          idPassager,
        };

        const bagageResponse = await fetch(`http://${constantes.hostbackend}/api/bagage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bagage),
        });

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

  return (
    <div className="width-50% margin-0-auto padding-20px">
      <h1 className="text-align-center text-lg margin-bottom-40px height-50px text-blue-400">
        <b>Qui voyage ?</b>
      </h1>
      <br />
      <form
        className="display-flex flex-direction-column"
        onSubmit={handleSubmit}
      >
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="border border-gray-500 relative p-2 rounded-md shadow-md mb-2"
          >
            <h2>
              <b>PASSAGER {index + 1}:</b>
            </h2>
            <br />
            <div className={styles.formGroup}>
              <label
                className="display-block margin-bottom-5px"
                htmlFor={`name-${index}`}
              >
                <b>Nom de famille: </b>
              </label>
              <input
                type="text"
                id={`name-${index}`}
                className={styles.inputStyle}
                value={passenger.nom}
                onChange={(event) =>
                  handleInputChange(index, "nom", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`prenom-${index}`}>
                <b>Prenom(s): </b>
              </label>
              <input
                type="text"
                id={`prenom-${index}`}
                className={styles.inputStyle}
                value={passenger.prenom}
                onChange={(event) =>
                  handleInputChange(index, "prenom", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`age-${index}`}>
                <b>Âge: </b>
              </label>
              <input
                type="number"
                id={`age-${index}`}
                value={passenger.age}
                onChange={(event) =>
                  handleInputChange(index, "age", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`type-${index}`}>
                <b>Type: </b>
              </label>
              <select
                id={`type-${index}`}
                value={passenger.type}
                onChange={(event) =>
                  handleInputChange(index, "type", event.target.value)
                }
              >
                <option value="">Select Type</option>
                <option value="adulte">Adulte</option>
                <option value="enfant">Enfant</option>
                <option value="handicapé">Handicapé</option>
              </select>
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`genre-${index}`}>
                <b>Genre: </b>
              </label>
              <select
                id={`genre-${index}`}
                value={passenger.genre}
                onChange={(event) =>
                  handleInputChange(index, "genre", event.target.value)
                }
              >
                <option value="">Select Genre</option>
                <option value="masculin">Masculin</option>
                <option value="féminin">Féminin</option>
              </select>
            </div>
            <br />
            <div className={styles.formGroup}>
              <label
                className="display-block margin-bottom-5px"
                htmlFor={`idNumber-${index}`}
              >
                <b>Numéro de carte d'identité: </b>
              </label>
              <input
                type="text"
                id={`idNumber-${index}`}
                className="w-full pl-5 outline-none"
                value={passenger.idNumber}
                onChange={(event) =>
                  handleInputChange(index, "idNumber", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`poidsBagage-${index}`}>
                <b>Poids des bagages: </b>
              </label>
              <input
                type="text"
                id={`poidsBagage-${index}`}
                className="w-full pl-5 outline-none"
                value={passenger.poidsBagage}
                onChange={(event) =>
                  handleInputChange(index, "poidsBagage", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`nbreBagage-${index}`}>
                <b>Nombre de bagages: </b>
              </label>
              <input
                type="number"
                id={`nbreBagage-${index}`}
                className="w-full pl-5 outline-none"
                value={passenger.nbreBagage}
                onChange={(event) =>
                  handleInputChange(index, "nbreBagage", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`prixBagage-${index}`}>
                <b>Prix des bagages: </b>
              </label>
              <input
                type="number"
                id={`prixBagage-${index}`}
                className="w-full pl-5 outline-none"
                value={passenger.prixBagage}
                onChange={(event) =>
                  handleInputChange(index, "prixBagage", event.target.value)
                }
              />
            </div>
            <br />
            <button
              type="button"
              className={styles.submitButton}
              onClick={() => handleRemovePassenger(index)}
            >
              Retirer le passager
            </button>
          </div>
        ))}
        <br />
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleAddPassenger}
        >
          Ajouter un passager
        </button>

        <> </>

        <button type="submit" className={styles.submitButton}>
          Reserver
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
