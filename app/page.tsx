import SearchForm from "./components/SearchForm";
import OptionsBuy from "./components/optionsBuy";
import BookingPage from "./components/BookingPage";
import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/components/booking.module.css";
import InfoVol from "./components/InfoVol";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 p-4 gap-4 h-screen">
      <div className="h-full col-span-2 md:order-first order-first p-4 border border-gray-200 rounded-md">
        <iframe
          className="w-full h-full rounded-md sticky top-0 z-50"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824562855!2d2.264634812292689!3d48.85893843467764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1712364568725!5m2!1sfr!2sfr"
          width="10000"
          height="5000"
          loading="lazy"
        ></iframe>
      </div>
      <div
        id="test"
        className="h-full w-50 border border-gray-500 rounded-md p-5 "
      >
        <SearchForm />
      </div>
      <InfoVol />

      <BookingPage />
      <OptionsBuy />
    </div>
  );
}
