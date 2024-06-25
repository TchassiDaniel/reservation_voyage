"use client";
import { useState, useEffect } from "react";
import { constantes } from "../constante";
import PassengerForm from "./PassengerForm";
import PassengerList from "./PassengerList";
import ModalAlert from "./ModalAlert";

const BookingPage = () => {
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "info" });
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
  const [flightPrice, setFlightPrice] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);

  const handleShowPassengerForm = () => {
    if (totalPassengers <= 0) {
      setMessage({
        message: "Veuillez entrer un nombre total de passagers valide.",
        type: "info",
      });
      setShowModal(true);
      return;
    }

    checkAvailableSeats(totalPassengers);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    if (passengers.length >= totalPassengers) {
      setMessage({
        message: "Vous ne pouvez pas ajouter plus de passagers que le nombre total spécifié.",
        type: "info",
      });
      setShowModal(true);
      return;
    }

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
        message.message =
          "Please fill in all required fields (Name, Last Name, Age, ID Number) for all passengers.";
        message.type = "info";
        openModal();
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
        throw new Error("Nous ne pouvons creer votre reservation !");
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
          throw new Error(`Nous ne pouvons ajouter le passager"${passenger.nom} ${passenger.prenom}`);
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
          throw new Error(`Nous ne pouvons ajouter les bagages du passager"${passenger.nom} ${passenger.prenom}`);
        }
      }
      setMessage({
        message: "Reservation effectuée avec succes!",
        type: "success",
      });
      setShowModal(true);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({
        message: "Erreur lors de la création de la réservation et des passagers",
        type: "error",
      });
      setShowModal(true);
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
      setMessage({
        message: "Erreur lors de la sélection du prix du vol",
        type: "error",
      });
      setShowModal(true);
    }
  };

  const checkAvailableSeats = async (nbrePassager) => {
    try {
      const response = await fetch(
        `http://${constantes.hostbackend}/api/voyage/place/${constantes.idVoyage}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la vérification des places disponibles");
      }
      const data = await response.json();
      const availableSeats = data.data.nbrePlaceRestante;
      if (nbrePassager > availableSeats) {
        setMessage({
          message: `Il n'y a que ${availableSeats} places disponibles. Veuillez ajuster le nombre total de passagers.`,
          type: "info",
        });
        setShowModal(true);
        return;
      }
      setShowPassengerForm(true);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({
        message: "Erreur lors de la vérification des places disponibles",
        type: "error",
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchFlightPrice();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">
        <b>Réservation de Voyage</b>
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <div className="mb-4">
            <label htmlFor="totalPassengers" className="block mb-2">
              <b>Nombre total de passagers:</b>
            </label>
            <input
              type="number"
              id="totalPassengers"
              value={totalPassengers}
              onChange={(e) => setTotalPassengers(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
              onClick={handleShowPassengerForm}
            >
              Confirmer le nombre de passagers
            </button>
          </div>
          {showPassengerForm && (
            <PassengerForm
              passengers={passengers}
              handleInputChange={handleInputChange}
              handleAddPassenger={handleAddPassenger}
              selectedPassengerIndex={selectedPassengerIndex}
            />
          )}
        </div>
        <PassengerList
          passengers={passengers}
          handlePassengerSelect={handlePassengerSelect}
          handleRemovePassenger={handleRemovePassenger}
          handleSubmit={handleSubmit}
          calculateTotalBaggagePrice={calculateTotalBaggagePrice}
          flightPrice={flightPrice}
          alert={alert}
          message={message}
          showModal={showModal}
          closeModal={closeModal}
        />
      </div>
      <ModalAlert
        message={message.message}
        type={message.type}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default BookingPage;
