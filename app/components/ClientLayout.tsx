"use client";

import React, { useState } from "react";
import Header from "./Header";
import Statistics from "../Statistics";
import HistoriquePage from "../historique";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentView, setCurrentView] = useState("reservation");

  const handleNavClick = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div>
      <div id="header">
        <Header onNavClick={handleNavClick} />
      </div>
      <main className="p-6">
        {currentView === "reservation" && children}
        {currentView === "historique" && <HistoriquePage />}
        {currentView === "statistiques" && (
          <div className="container">
            <Statistics />
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientLayout;
