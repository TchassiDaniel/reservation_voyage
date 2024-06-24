import React, { createContext, useState } from 'react';

export const VoyageContext = createContext(0);

export const VoyageProvider = ({ children }) => {
  const [voyageData, setVoyageData] = useState({
    vehicule: null,
    marque: null,
    modele: null,
    nombrePlaceTotale: null,
    nombrePlaceRestante: null,
    prixFinal: null,
    reductionFidelite: null,
    nombrePassagers: 0,
    bagages: 0,
    servicesExtra: null,
  });

  return (
    <VoyageContext.Provider value={{ voyageData, setVoyageData }}>
      {children}
    </VoyageContext.Provider>
  );
};
