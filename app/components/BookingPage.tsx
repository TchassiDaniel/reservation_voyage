"use client";
import { useState, useEffect } from "react";
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
    },
  ]);

  const [flightPrice, setFlightPrice] = useState(0);

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
      },
    ]);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const calculateTotalBaggagePrice = () => {
    return passengers.reduce((total, passenger) => total + passenger.nbreBagage * 1000, 0);
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
        const idPassager = passagerData.value;
        console.log(idPassager);

        const bagage = {
          nbreBagage: passenger.nbreBagage,
          poids: passenger.poidsBagage,
          prix: passenger.nbreBagage * 1000,
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

  const fetchFlightPrice = async () => {
    try {
      const response = await fetch(`http://${constantes.hostbackend}/api/voyage/${constantes.idVoyage}`);
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
    <div className="display-flex width-100%">
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
                  <option value="ADULTE">Adulte</option>
                  <option value="ENFANT">Enfant</option>
                  <option value="HANDICAPE">Handicapé</option>
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
                  <option value="HOMME">Masculin</option>
                  <option value="FEMME">Féminin</option>
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
                  <b>Poids des bagages(Kg): </b>
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
      <div className="w-1/2 p-5">
        <h2 className="text-lg font-bold mb-4">Résumé</h2>
        <p className="mb-2"><b>Nombre total de passagers :</b> {passengers.length}</p>
        <p className="mb-2"><b>Nombre total de bagages :</b> {passengers.reduce((total, passenger) => total + passenger.nbreBagage, 0)}</p>
        <p className="mb-2"><b>Prix total du vol :</b> {flightPrice * passengers.length} F CFA</p>
        <p className="mb-2"><b>Prix total des bagages :</b> {calculateTotalBaggagePrice()} F CFA</p>
      </div>

    </div>
  );
};

export default BookingPage;
