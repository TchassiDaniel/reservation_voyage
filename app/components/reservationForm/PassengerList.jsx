import React from "react";
import ModalAlert from "./ModalAlert";

const PassengerList = ({
  passengers,
  handlePassengerSelect,
  handleRemovePassenger,
  handleSubmit,
  calculateTotalBaggagePrice,
  flightPrice,
  alert,
  message,
  showModal,
  closeModal,
}) => {
  return (
    <div className="md:w-1/2 p-4">
      <h2 className="text-lg mb-4 text-blue-400">
        <b>Liste des passagers</b>
      </h2>
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nom et Prénom</th>
            <th className="border border-gray-300 p-2">Numéro de pièce d'identité</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index} className="border-b">
              <td
                className="border border-gray-300 p-2 cursor-pointer"
                onClick={() => handlePassengerSelect(index)}
              >
                {passenger.nom} {passenger.prenom}
              </td>
              <td className="border border-gray-300 p-2">{passenger.idNumber}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleRemovePassenger(index)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-4">
        <h3 className="text-lg mb-2">
          <b>Résumé de la réservation</b>
        </h3>
        <p>Total passagers: {passengers.length}</p>
        <p>Prix total du vol: {passengers.length * flightPrice} CFA</p>
        <p>Prix total des bagages: {calculateTotalBaggagePrice()} CFA</p>
        <p>
          <b>
            Prix total: {passengers.length * flightPrice + calculateTotalBaggagePrice()} CFA
          </b>
        </p>
      </div>
      <button
        type="button"
        className="bg-green-500 text-white py-2 px-4 rounded-md"
        onClick={handleSubmit}
      >
        Soumettre la réservation
      </button>
      <ModalAlert
        message={message.message}
        type={message.type}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default PassengerList;
