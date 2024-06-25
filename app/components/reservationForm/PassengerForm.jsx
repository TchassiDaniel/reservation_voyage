import React from "react";

const PassengerForm = ({
  passengers,
  handleInputChange,
  handleAddPassenger,
  selectedPassengerIndex,
}) => {
  return (
    <form>
      {selectedPassengerIndex !== null && (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="mb-4">
            <label htmlFor={`nom-${selectedPassengerIndex}`} className="block mb-2">
              <b>Nom:</b>
            </label>
            <input
              type="text"
              id={`nom-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].nom}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "nom", event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`prenom-${selectedPassengerIndex}`} className="block mb-2">
              <b>Prénom:</b>
            </label>
            <input
              type="text"
              id={`prenom-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].prenom}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "prenom", event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`age-${selectedPassengerIndex}`} className="block mb-2">
              <b>Age:</b>
            </label>
            <input
              type="number"
              id={`age-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].age}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "age", event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`idNumber-${selectedPassengerIndex}`} className="block mb-2">
              <b>Numéro de pièce d'identité:</b>
            </label>
            <input
              type="text"
              id={`idNumber-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].idNumber}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "idNumber", event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`genre-${selectedPassengerIndex}`} className="block mb-2">
              <b>Genre:</b>
            </label>
            <select
              id={`genre-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].genre}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "genre", event.target.value)
              }
            >
              <option value="">Sélectionnez un genre</option>
              <option value="HOMME">Homme</option>
              <option value="FEMME">Femme</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor={`type-${selectedPassengerIndex}`} className="block mb-2">
              <b>Type:</b>
            </label>
            <select
              id={`type-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].type}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "type", event.target.value)
              }
            >
              <option value="">Sélectionnez un type</option>
              <option value="ADULTE">Adulte</option>
              <option value="ENFANT">Enfant</option>
              <option value="HANDICAPE">HANDICAPE</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor={`nbreBagage-${selectedPassengerIndex}`} className="block mb-2">
              <b>Nombre de bagages:</b>
            </label>
            <input
              type="number"
              id={`nbreBagage-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].nbreBagage}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "nbreBagage", event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`poidsBagage-${selectedPassengerIndex}`} className="block mb-2">
              <b>Poids total des bagages:</b>
            </label>
            <input
              type="number"
              id={`poidsBagage-${selectedPassengerIndex}`}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={passengers[selectedPassengerIndex].poidsBagage}
              onChange={(event) =>
                handleInputChange(selectedPassengerIndex, "poidsBagage", event.target.value)
              }
            />
          </div>
        </div>
      )}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={handleAddPassenger}
      >
        Ajouter un passager
      </button>
    </form>
  );
};

export default PassengerForm;
