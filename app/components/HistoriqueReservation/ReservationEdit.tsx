import { useState, useEffect } from "react";
import { constantes } from "../constante"; // Assurez-vous de définir et importer les constantes appropriées

const EditReservation = ({ passengers, reservationId, onSave, onCancel }) => {
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [updatedPassengers, setUpdatedPassengers] = useState(passengers);
  const [flightPrice, setFlightPrice] = useState(0);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    if (selectedPassenger !== null) {
      setUpdatedPassengers((prev) =>
        prev.map((p, i) => (i === selectedPassenger ? { ...p } : p))
      );
    }
  }, [selectedPassenger]);

  const handleInputChange = (index, field, value) => {
    setUpdatedPassengers((prevPassengers) => {
      const updatedPassengersCopy = [...prevPassengers];
      const passengerToUpdate = { ...updatedPassengersCopy[index] };
  
      // Pour modifier les champs imbriqués comme 'bagages.nbreBagage' et 'bagages.poids'
      if (field.startsWith('bagages.')) {
        const bagagesField = field.split('.')[1]; // Extrait 'nbreBagage' ou 'poids'
        passengerToUpdate.bagages = {
          ...passengerToUpdate.bagages,
          [bagagesField]: value,
        };
      } else {
        // Pour les autres champs directement dans le passager
        passengerToUpdate[field] = value;
      }
  
      updatedPassengersCopy[index] = passengerToUpdate;
      return updatedPassengersCopy;
    });
  };
  
  const deletePassager = async (passagerId) => {
    console.log("passager to delete ",passagerId);
    try {
      const response = await fetch(`http://localhost:8080/api/passager/${passagerId}`, {
        method: 'DELETE',
        headers: {
          // Vous pouvez ajouter des headers ici si nécessaire, comme les jetons d'authentification
        },
      });
  
      if (!response.ok) {
        throw new Error('La suppression de l\'utilisateur a échoué');
      }
  
      console.log('Utilisateur supprimé avec succès');
      // Traitez la suppression réussie si nécessaire
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      // Gérez les erreurs, par exemple afficher une notification à l'utilisateur
    }
  };

  {/*const handleDeletePassenger = (index) => {
    //selectedPassenger == null ? calculateTotalBaggagePrice(): deletePassager(selectedPassenger.idPassager);
    setToDelete([...toDelete, selectedPassenger.idPassager]);
    setUpdatedPassengers((prev) => prev.filter((_, i) => i !== index));
    setSelectedPassenger(null);
  };*/}

  const handleDeletePassenger = (index) => {
    // Récupérer le passager à supprimer en utilisant l'index
    const passengerToDelete = updatedPassengers[index];
  
    if (passengerToDelete) {
      // Supprimer le passager de votre backend ou marquer à supprimer plus tard
      deletePassager(passengerToDelete.idPassager); // Supprimez le passager par son ID dans votre backend
      console.log("selected dsff",passengerToDelete);
      // Mettre à jour la liste des passagers affichés en filtrant celui à supprimer
      setUpdatedPassengers((prev) => prev.filter((_, i) => i !== index));
    }
  
    // Réinitialiser le passager sélectionné à null
    setSelectedPassenger(null);
  };

  const calculateTotalBaggagePrice = () => {
    return updatedPassengers.reduce(
      (total, passenger) => total + passenger.bagages.nbreBagage * 1000,
      0
    );
  };

  const handleSaveChanges = async () => {
    try {
      const totalBaggagePrice = calculateTotalBaggagePrice();
      const reservation = {
        dateReservation: new Date().toISOString(),
        nbrePassager: updatedPassengers.length,
        prixTotal: flightPrice * updatedPassengers.length + totalBaggagePrice,
        idUtilisateur: constantes.idUtilisateur,
        idVoyage: constantes.idVoyage,
        idReservation: reservationId,
        statutReservation: "EN_ATTENTE_DE_CONFIRMATION",
        timerDate: 0
      };
      const reservationResponse = await fetch(
        `http://${constantes.hostbackend}/api/reservation`,
        {
          method: "PUT",
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
      console.log("idreservation",reservationId);

      for(const idPassager of toDelete){
        deletePassager(idPassager);
      }

      for (const passenger of updatedPassengers) {
        const passager = {
          nom: passenger.nom,
          prenom: passenger.prenom,
          type: passenger.type,
          genre: passenger.genre,
          age: parseInt(passenger.age),
          numPieceIdentification: passenger.numPieceIdentification,
          idReservation: reservationId,
          idPassager: passenger.idPassager
        };
        console.log(passager);
        const passagerResponse = await fetch(
          `http://${constantes.hostbackend}/api/passager`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(passager),
          }
        );

        if (!passagerResponse.ok) {
          throw new Error(`Nous ne pouvons ajouter le passager "${passenger.nom} ${passenger.prenom}"`);
        }

        const passagerData = await passagerResponse.json();
        const idPassager = passagerData.value;
        console.log("passenger", passager);
        console.log("passenger", passagerData);

        const bagage = {
          nbreBagage: passenger.bagages.nbreBagage,
          poids: passenger.bagages.poids,
          prix: passenger.bagages.nbreBagage * 1000,
          idPassager: passenger.idPassager,
          idBagage: passenger.bagages.idBagage,
        };
        console.log("Le bagage",bagage);
        const bagageResponse = await fetch(
          `http://${constantes.hostbackend}/api/bagage`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bagage),
          }
        );

        if (!bagageResponse.ok) {
          throw new Error(`Nous ne pouvons ajouter les bagages du passager "${passenger.nom} ${passenger.prenom}"`);
        }
      }
      alert("Réservation effectuée avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création de la réservation et des passagers");
    }
    onSave();
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
      alert("Erreur lors de la sélection du prix du vol");
    }
  };

  useEffect(() => {
    fetchFlightPrice();
  }, []);

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
                  <th className="py-2 px-4">Action</th>
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
                    <td className="py-2 px-4">{passenger.numPieceIdentification}</td>
                    <td className="py-2 px-4">{passenger.bagages.poids} kg</td>
                    <td className="py-2 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePassenger(index);
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
                      <option value="HOMME">Homme</option>
                      <option value="FEMME">Femme</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="numPieceIdentification"><b>Numéro de pièce d'identité:</b></label>
                    <input
                      type="text"
                      id="numPieceIdentification"
                      className="p-2 border border-gray-300 rounded-md"
                      value={updatedPassengers[selectedPassenger].numPieceIdentification}
                      onChange={(event) => handleInputChange(selectedPassenger, "numPieceIdentification", event.target.value)}
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
