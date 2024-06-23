"use client";

import React, { useState } from "react";
import Header from "./Header";
import Statistics from "../Statistics";

interface Reservation {
  id: number;
  name: string;
  date: string;
  countdown: number;
}

const reservations: Reservation[] = [
  { id: 1, name: "John Doe", date: "2024-06-22", countdown: 24 },
  { id: 2, name: "Jane Smith", date: "2024-06-21", countdown: 18 },
];

const Historique = () => {
  const [localReservations, setLocalReservations] = useState(reservations);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLocalReservations((prevReservations) =>
        prevReservations.map((reservation) => ({
          ...reservation,
          countdown: Math.max(reservation.countdown - 1, 0),
        }))
      );
    }, 3600000); // Update every hour

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Historique de reservation</h2>
      <ul>
        {localReservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.name} - {reservation.date} - {reservation.countdown}h
            restant
          </li>
        ))}
      </ul>
    </div>
  );
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentView, setCurrentView] = useState("reservation");

  const handleNavClick = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div>
      <Header onNavClick={handleNavClick} />
      <main className="p-6">
        {currentView === "reservation" && children}
        {currentView === "historique" && <Historique />}
        {currentView === "statistiques" && <Statistics />}
      </main>
    </div>
  );
};

export default ClientLayout;
