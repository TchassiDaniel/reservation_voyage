import { useState, useEffect } from "react";
import { constantes } from "../constante";
import EditReservation from "./ReservationEdit";

const ReservationDetails = ({ reservation, onClose }) => {
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [passengers, setPassengers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);


  const fetchDetails = async () => {
    setLoadingDetails(true);
    try {
      const response = await fetch(
        `http://${constantes.hostbackend}/api/passager/allByReservation/${reservation.idReservation}`
      );
      const data = await response.json();
      const passengersWithBags = await Promise.all(
        data.data.map(async (passenger) => {
          const bagResponse = await fetch(
            `http://${constantes.hostbackend}/api/bagage/allByPassager/${passenger.idPassager}`
          );
          const bagData = await bagResponse.json();
          return { ...passenger, bagages: bagData.data };
        })
      );
      console.log(passengersWithBags);
      setPassengers(passengersWithBags);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  },[reloadComponent] );//[reservation.idReservation]

  const handleEdit = () => {
    fetchDetails();
    setEditing(true);
  };

  const handleClickReload = () => {
    setReloadComponent((prev) => !prev); // Inverse la valeur actuelle de reloadComponent
  };

  const handleSaveEdit = () => {
    setEditing(false);
    handleClickReload();
    // Rafraîchir les détails si nécessaire après la modification
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Détails de la réservation</h2>
        {loadingDetails ? (
          <p>Chargement des détails...</p>
        ) : (
          <>
            <p>Date de réservation: {new Date(reservation.dateReservation).toLocaleDateString()}</p>
            <p>Nombre de passagers: {reservation.nbrePassager}</p>
            <p>Prix total: {reservation.prixTotal}F CFA</p>
            <p>Statut: {reservation.statutReservation}</p>
            <h3 className="text-lg font-semibold mt-4">Passagers:</h3>
            <table className="min-w-full bg-gray-200 divide-y divide-gray-300">
                <thead className="bg-gray-400">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Prénom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Genre</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre de bagages</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Poids total des bagages (kg)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {passengers.map((passenger, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap">{passenger.nom}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{passenger.prenom}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{passenger.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{passenger.genre}</td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">{passenger.bagages.nbreBagage}</td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">{passenger.bagages.poids}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!editing && (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
              >
                Modifier les passagers
              </button>
            )}
            {editing && (
              <EditReservation
                passengers={passengers}
                reservationId={reservation.idReservation}
                onSave={handleSaveEdit}
                onCancel={() => setEditing(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationDetails;
