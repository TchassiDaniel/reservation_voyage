"use client";
import { constantes } from "./constante";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsTelephone } from "react-icons/bs";


export default function InfoVol() {
  const [data, setData] = useState({
    vehicule: null,
    marque: null,
    modele: null,
    nombrePlaceTotale: null,
    prixFinal: null,
    reductionFidelite: null,
    nombrePassagers: null,
    bagages: null,
    servicesExtra: null,
    photoVehicule: null,
  });
  const [nombrePlaceRestante, setNombrePlaceRestante] = useState("Non spécifié");
  const [conducteur, setConducteur] = useState({
    nom : null,
    prenom : null,
    telephone : null,
    email : null,
    categorie : null,
    lienPhoto : null,
    adresse : null,
  });

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const response = await fetch(`http://${constantes.hostbackend}/api/vehicule/${constantes.idVehicule}`);
        const vehiculeData = await response.json();
        console.log(vehiculeData);
        setData(prevData => ({
          ...prevData,
          vehicule: vehiculeData.data.marque + ' ' + vehiculeData.data.modele,
          marque: vehiculeData.data.marque,
          modele: vehiculeData.data.modele,
          nombrePlaceTotale: vehiculeData.data.nombrePlace,
          photoVehicule: vehiculeData.data.lienPhoto,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données du véhicule:", error);
      }
    };

    const fetchVoyage = async () => {
      try {
        const response = await fetch(`http://${constantes.hostbackend}/api/voyage/${constantes.idVoyage}`);
        const voyageData = await response.json();
        console.log(voyageData);
        setData(prevData => ({
          ...prevData,
          prixFinal: voyageData.data.prix,
          reductionFidelite: voyageData.data.reductionFidelite,
          nombrePassagers: voyageData.data.nombrePassagers,
          bagages: voyageData.bagages,
          servicesExtra: voyageData.servicesExtra,
          //nombrePlaceRestante: parseInt(data.nombrePlaceTotale) - parseInt(voyageData.data.nombrePlaceConfirme) - parseInt(voyageData.data.nombrePlaceReserve),
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données du voyage:", error);
      }
    };

    const fetchConducteur = async () => {
      try {
        const response = await fetch(`http://${constantes.hostbackend}/api/conducteur/${constantes.idConducteur}`);
        const conducteurData = await response.json();
        console.log(conducteurData);
        setConducteur(conducteurData.data);
        console.log("Le conducteur",conducteur);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du véhicule:", error);
      }
    };

    const fetchPlaceRestante = async () => {
      try {
        const response = await fetch(`http://${constantes.hostbackend}/api/voyage/place/${constantes.idVoyage}`);
        const place = await response.json();
        console.log(place);
        setNombrePlaceRestante(place.data.nbrePlaceRestante);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du véhicule:", error);
      }
    };
    fetchPlaceRestante();
    fetchVehicule();
    fetchConducteur();
    fetchVoyage();
  }, []);

  return (
    <div className="border border-gray-500 relative p-2 rounded-md shadow-md mb-2">
      <h1 className="font-bold mb-2 text-lg text-center text-black-400">
        Informations sur le voyage
      </h1>

      <div>
        <p>----------------------------------------------------------------------------------</p>
        <p><b>Véhicule :</b> {data.vehicule ?? "Non spécifié"}</p>
        <p><b>Marque :</b> {data.marque ?? "Non spécifié"}</p>
        <p><b>Modèle :</b> {data.modele ?? "Non spécifié"}</p>
        <p><b>Nombre de places totales :</b> {data.nombrePlaceTotale ?? "Non spécifié"}</p>
        <p><b>Nombre de places restantes :</b> {nombrePlaceRestante ?? "Non spécifié"}</p>
        <p>---------------------------------------------------------------------------------</p>
        <p><b>Prix du voyage :</b> {data.prixFinal ?? "Non spécifié"} F CFA</p>
        {/*<p><b>Réduction fidélité :</b> {data.reductionFidelite ?? "Non spécifié"} F CFA</p>
        <p>------------------------------------------------------------------------------------------------------------------</p>
        <p><b>Nombre de passagers :</b> {data.nombrePassagers ?? "Non spécifié"}</p>
        <p><b>Bagages :</b> {data.bagages ?? "Non spécifié"}</p>
        <p><b>Services extra choisis :</b> {data.servicesExtra ?? "Non spécifié"}</p>
        */}
      </div>
      {/* New Div for Bus Photo */}
      <div className="flex justify-center items-center mt-4">
      <Image
        src="/bus.jpg" // Chemin vers votre image dans le dossier public
        alt="Description de l'image"
        width={150} // Largeur de l'image
        height={100} // Hauteur de l'image
      />

        </div>

        {/* New Div for Driver Information */}
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-center text-lg mb-2 text-blue-400">
            <b>Informations sur le conducteur</b>
          </h3>
          <div className="flex justify-center mb-2">
              <Image
                src="/conducteur.jpg" // Chemin vers votre image dans le dossier public
                alt="Description de l'image"
                width={150} // Largeur de l'image
                height={100} // Hauteur de l'image
          />
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2">
             {/* <span className="font-bold">Nom du conducteur : </span>*/}
              <span>{conducteur.nom} {conducteur.prenom}</span>
            </div>
            <div>
              <span className="font-bold">Tel: </span>
              <span>{conducteur.telephone}</span>
            </div>
          </div>
        </div>
    </div>
  );
}


{
  /*"use client";
import React, { useState, useEffect } from "react";
import { constantes } from "./constante";

export default function InfoVol() {
  const [data, setData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://${constantes.hostbackend}/voyage/${constantes.idVoyage}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();

        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="border border-gray-500 relative p-2 rounded-md shadow-md mb-2">
      <h1 className="font-bold mb-2 text-lg text-center text-black-400">
        Informations sur le voyage
      </h1>

      <div>
        <p>
          ----------------------------------------------------------------------------------------------------------
        </p>
        <p>
          <b>ID du Voyage :</b> {data.idVoyage ?? "Non spécifié"}
        </p>
        <p>
          <b>Date de Départ Prévue :</b>{" "}
          {data.dateDepartPrevue ?? "Non spécifié"}
        </p>
        <p>
          <b>Date de Départ Effective :</b>{" "}
          {data.dateDepartEffective ?? "Non spécifié"}
        </p>
        <p>
          <b>Date d'Arrivée Prévue :</b>{" "}
          {data.dateArriveePrevue ?? "Non spécifié"}
        </p>
        <p>
          <b>Date d'Arrivée Effective :</b>{" "}
          {data.dateArriveeEffective ?? "Non spécifié"}
        </p>
        <p>
          <b>Durée :</b> {data.duree ?? "Non spécifié"} minutes
        </p>
        <p>
          <b>Prix :</b> {data.prix ?? "Non spécifié"} F CFA
        </p>
        <p>
          <b>Lieu de Départ :</b> {data.lieuDepart ?? "Non spécifié"}
        </p>
        <p>
          <b>Lieu d'Arrivée :</b> {data.lieuArrivee ?? "Non spécifié"}
        </p>
        <p>
          <b>Classe de Voyage :</b> {data.classeVoyage ?? "Non spécifié"}
        </p>
        <p>
          <b>Nombre de Places Confirmées :</b>{" "}
          {data.nombrePlaceConfirme ?? "Non spécifié"}
        </p>
        <p>
          <b>Nombre de Places Réservées :</b>{" "}
          {data.nombrePlaceReserve ?? "Non spécifié"}
        </p>
        <p>
          <b>Statut :</b> {data.statut ?? "Non spécifié"}
        </p>
        <p>
          ----------------------------------------------------------------------------------------------------------
        </p>
      </div>
    </div>
  );
}
*/
}
