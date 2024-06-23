"use client";
import { useState, useEffect } from "react";
import { FaMapPin } from "react-icons/fa";
import { constantes } from "./constante";

export default function SearchForm() {
  // Définir l'état initial des données de voyage
  const [voyageData, setVoyageData] = useState({
    idVoyage: null,
    dateDepartPrevue: null,
    dateDepartEffective: null,
    dateArriveePrevue: null,
    dateArriveeEffective: null,
    duree: null,
    prix: null,
    lieuDepart: null,
    lieuArrivee: null,
    classeVoyage: null,
    nombrePlaceConfirme: null,
    nombrePlaceReserve: null,
    statut: null,
  });

  // Définir l'état de chargement et d'erreur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser useEffect pour récupérer les données de voyage
  useEffect(() => {
    const apiUrl = `http://${constantes.hostbackend}/api/voyage/${constantes.idVoyage}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setVoyageData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Afficher un message de chargement ou d'erreur si nécessaire
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  // Rendre le formulaire de recherche avec les données récupérées
  return (
    <>
      <h1 className="font-bold mb-2 text-lg text-center text-black-400">
        Trajet
      </h1>
      <label className="font-bold mb-2 text-sm text-black-400">Départ</label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md mb-2">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input
          type="text"
          className="w-full pl-5 outline-none"
          value={voyageData.lieuDepart || ''}
        />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Destination
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input
          type="text"
          className="w-full pl-5 outline-none"
          value={voyageData.lieuArrivee || ''}
        />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Date prévue de départ
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input
          type="text"
          className="w-full pl-5 outline-none"
          value={voyageData.dateDepartPrevue || '01 juin 2025'}
        />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Heure de départ
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input
          type="text"
          className="w-full pl-5 outline-none"
          value={voyageData.dateDepartEffective ? new Date(voyageData.dateDepartEffective).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '12h00'}
        />
      </div>
    </>
  );
}
