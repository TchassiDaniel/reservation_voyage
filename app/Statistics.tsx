import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type DataPeriod = "day" | "month" | "year";

interface PeriodData {
  labels: string[];
  lineData: {
    confirmed: number[];
    cancelled: number[];
    pending: number[];
  };
  pieData: number[];
}

const dataByPeriod: Record<DataPeriod, PeriodData> = {
  day: {
    labels: ["0h", "4h", "8h", "12h", "16h", "20h"],
    lineData: {
      confirmed: [10, 15, 12, 14, 16, 13],
      cancelled: [2, 3, 2, 4, 3, 2],
      pending: [1, 2, 1, 2, 2, 1],
    },
    pieData: [65, 15, 20],
  },
  month: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    lineData: {
      confirmed: [120, 150, 100, 130],
      cancelled: [20, 30, 25, 28],
      pending: [15, 17, 16, 18],
    },
    pieData: [65, 15, 20],
  },
  year: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    lineData: {
      confirmed: [1200, 1500, 1000, 1300, 1600, 1100],
      cancelled: [200, 300, 250, 280, 320, 260],
      pending: [150, 170, 160, 180, 190, 200],
    },
    pieData: [65, 15, 20],
  },
};

const Statistics = () => {
  const [period, setPeriod] = useState<DataPeriod>("month");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handlePeriodChange = (newPeriod: DataPeriod) => {
    setPeriod(newPeriod);
  };

  const currentData: PeriodData = dataByPeriod[period];

  const lineData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Réservations confirmées",
        data: currentData.lineData.confirmed,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Réservations annulées",
        data: currentData.lineData.cancelled,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Réservations en attente",
        data: currentData.lineData.pending,
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Confirmées", "Annulées", "En attente"],
    datasets: [
      {
        data: currentData.pieData,
        backgroundColor: ["green", "red", "orange"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Statistiques de réservation</h2>
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 rounded ${
            period === "day" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePeriodChange("day")}
        >
          Jour
        </button>
        <button
          className={`py-2 px-4 rounded ${
            period === "month" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePeriodChange("month")}
        >
          Mois
        </button>
        <button
          className={`py-2 px-4 rounded ${
            period === "year" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePeriodChange("year")}
        >
          Année
        </button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span>Période:</span>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <span>à</span>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Line data={lineData} />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
