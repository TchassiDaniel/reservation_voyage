import { useState, useEffect } from "react";
import { constantes } from "../constante"; // Assurez-vous de définir et importer les constantes appropriées

const EditReservation = ({ passengers, reservationId, onSave, onCancel }) => {
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [updatedPassengers, setUpdatedPassengers] = useState(passengers);

  useEffect(() => {
    if (selectedPassenger !== null) {
      setUpdatedPassengers((prev) =>
        prev.map((p, i) => (i === selectedPassenger ? { ...p } : p))
      );
    }
  }, [selectedPassenger]);

  const handleInputChange = (index, field, value) => {
    setUpdatedPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://${constantes.hostbackend}/api/passager/update/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ passengers: updatedPassengers }),
        }
      );

      if (response.ok) {
        alert("Réservation mise à jour avec succès!");
        onSave();
      } else {
        alert("Erreur lors de la mise à jour de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <h2 className="text-2xl font-bold mb-4">Modifier les passagers</h2>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">Nom complet</th>
                  <th className="py-2 px-4">Numéro de pièce</th>
                  <th className="py-2 px-4">Poids des bagages</th>
                </tr>
              </thead>
              <tbody>
                {updatedPassengers.map((passenger, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedPassenger(index)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="py-2 px-4">{passenger.nom} {passenger.prenom}</td>
                    <td className="py-2 px-4">{passenger.numpieceIdentification}</td>
                    <td className="py-2 px-4">{passenger.bagages.poids} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/2 pl-4">
            {selectedPassenger !== null && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Modifier le passager {selectedPassenger + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="nom"><b>Nom de famille:</b></label>
                    <input
                      type="text"
                      id="nom"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].nom}
                      onChange={(event) => handleInputChange(selectedPassenger, "nom", event.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="prenom"><b>Prénom:</b></label>
                    <input
                      type="text"
                      id="prenom"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].prenom}
                      onChange={(event) => handleInputChange(selectedPassenger, "prenom", event.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="type"><b>Type:</b></label>
                    <select
                      id="type"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].type}
                      onChange={(event) => handleInputChange(selectedPassenger, "type", event.target.value)}
                    >
                      <option value="">Sélectionner le type</option>
                      <option value="ADULTE">Adulte</option>
                      <option value="ENFANT">Enfant</option>
                      <option value="HANDICAPE">Handicapé</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="genre"><b>Genre:</b></label>
                    <select
                      id="genre"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].genre}
                      onChange={(event) => handleInputChange(selectedPassenger, "genre", event.target.value)}
                    >
                      <option value="">Sélectionner le genre</option>
                      <option value="HOMME">HOMME</option>
                      <option value="FEMME">FEMME</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="numpieceIdentification"><b>Numéro de pièce d'identité:</b></label>
                    <input
                      type="text"
                      id="numpieceIdentification"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].numpieceIdentification}
                      onChange={(event) => handleInputChange(selectedPassenger, "numpieceIdentification", event.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="nbreBagage"><b>Nombre de bagages:</b></label>
                    <input
                      type="number"
                      id="nbreBagage"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].bagages.nbreBagage}
                      onChange={(event) => handleInputChange(selectedPassenger, "bagages.nbreBagage", event.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="poidsBagages"><b>Poids des bagages:</b></label>
                    <input
                      type="number"
                      id="poidsBagages"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].bagages.poids}
                      onChange={(event) => handleInputChange(selectedPassenger, "bagages.poids", event.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Enregistrer les modifications
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservation;
