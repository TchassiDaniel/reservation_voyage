"use client";

import React, { useState } from "react";
import styles from "./booking.module.css";

const BookingPage = () => {
  const [passengers, setPassengers] = useState([
    {
      name: "",
      prenom: "",
      age: "",
      type: "",
      genre: "",
      idNumber: "",
      baggage: "",
    },
  ]);

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        name: "",
        prenom: "",
        age: "",
        type: "",
        genre: "",
        idNumber: "",
        baggage: "",
      },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    for (const passenger of passengers) {
      if (
        passenger.name.trim() === "" ||
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

    // Submit the passengers' data
  };

  return (
    <div className="width-50% margin-0-auto padding-20px">
      <h1 className="text-align-center text-lg margin-bottom-40px height-50px">
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
            <div className="margin-bottom-15px;">
              <label
                className="display-block margin-bottom-5px"
                htmlFor={`name-${index}`}
              >
                <b>Nom de famille: </b>
              </label>
              <input
                type="text"
                id={`name-${index}`}
                value={passenger.name}
                onChange={(event) =>
                  handleInputChange(index, "name", event.target.value)
                }
              />
            </div>
            <br />
            <div className="margin-bottom-15px">
              <label htmlFor={`prenom-${index}`}>
                <b>Prenom(s): </b>
              </label>
              <input
                type="text"
                id={`prenom-${index}`}
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
            <div className="margin-bottom-15px;">
              <label
                className="display-block margin-bottom-5px"
                htmlFor={`idNumber-${index}`}
              >
                <b>Numéro de carte d'identité: </b>
              </label>
              <input
                type="text"
                id={`idNumber-${index}`}
                value={passenger.idNumber}
                onChange={(event) =>
                  handleInputChange(index, "idNumber", event.target.value)
                }
              />
            </div>
            <br />
            <div className={styles.formGroup}>
              <label htmlFor={`baggage-${index}`}>
                <b>Poids des bagages: </b>
              </label>
              <select
                id={`baggage-${index}`}
                value={passenger.baggage}
                onChange={(event) =>
                  handleInputChange(index, "baggage", event.target.value)
                }
              >
                <option value="">Select Weight</option>
                <option value="1-25kg">[1kg, 25kg]</option>
                <option value="25-50kg">[25kg, 50kg]</option>
                <option value="50-100kg">[50kg, 100kg]</option>
              </select>
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
        <br />
        <button type="submit" className={styles.submitButton}>
          Reserver
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
