import React, { useEffect, useState } from "react";

const initialReservations = [
  // Example reservation data
  {
    id: 1,
    name: "John Doe",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  // Add more reservation objects as needed
];

const calculateTimeLeft = (date: Date) => {
  const difference = +new Date(date) - +new Date();
  let timeLeft: any = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const ReservationsHistory = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(initialReservations[0].date)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(initialReservations[0].date));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historique de reservation</h1>
      {reservations.map((reservation) => (
        <div key={reservation.id} className="border p-4 mb-2">
          <p>
            <b>Nom:</b> {reservation.name}
          </p>
          <p>
            <b>Heure restante:</b> {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReservationsHistory;
