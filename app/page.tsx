import SearchForm from "./components/SearchForm";
import OptionsBuy from "./components/optionsBuy";
import BookingPage from "./components/BookingPage";
import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/components/booking.module.css";
import InfoVol from "./components/InfoVol";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 p-4 gap-4 h-screen">
        <div className="h-full col-span-2 md:order-first order-first p-5 bg-white bg-opacity-90 border-2 border-gray-300 rounded-lg">
          <iframe
            className="w-full h-full rounded-md sticky top-0 z-50"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.640259266616!2d9.675094914769007!3d4.052062547005027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d0f27fffb6b%3A0x8a510dfc3e5051ee!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2sfr!4v1712364568725!5m2!1sen!2sfr"
            width="100%"
            height="500"
            loading="lazy"
          ></iframe>
        </div>
        <div className="container">
          <SearchForm />
        </div>

        <div className="container">
          <InfoVol />
        </div>
      </div>

      <div className="container1">
        <BookingPage />
      </div>

      <OptionsBuy />
    </div>
  );
}