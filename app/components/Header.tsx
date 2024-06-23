import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/public/logo-taxi.jpg";
import Image from "next/image";

interface HeaderProps {
  onNavClick: (view: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [activeView, setActiveView] = useState("reservation");

  const handleNavClick = (view: string) => {
    setActiveView(view);
    onNavClick(view);
  };

  return (
    <header className="background-color-white flex items-center justify-between py-3 px-6">
      <div className="flex items-center gap-3">
        <Image className="cursor-pointer" src={Logo} alt="Logo" width={60} />
        <ul className="hidden md:flex items-center gap-4">
          <li
            className={`font-bold cursor-pointer ${
              activeView === "reservation"
                ? "text-blue-500"
                : "text-[#333] hover:text-yellow-500"
            }`}
            onClick={() => handleNavClick("reservation")}
          >
            Reservation
          </li>
          <li
            className={`font-bold cursor-pointer ${
              activeView === "historique"
                ? "text-blue-500"
                : "text-[#333] hover:text-yellow-500"
            }`}
            onClick={() => handleNavClick("historique")}
          >
            Historique de reservation
          </li>
          <li
            className={`font-bold cursor-pointer ${
              activeView === "statistiques"
                ? "text-blue-500"
                : "text-[#333] hover:text-yellow-500"
            }`}
            onClick={() => handleNavClick("statistiques")}
          >
            Statistiques
          </li>
        </ul>
      </div>
      <UserButton />
    </header>
  );
}
