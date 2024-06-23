import { UserButton } from "@clerk/nextjs";
import Logo from "@/public/logo-taxi.png";
import Image from "next/image";

interface HeaderProps {
  onNavClick: (view: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  return (
    <header className="background-color-white flex items-center justify-between py-3 px-6">
      <div className="flex items-center gap-3">
        <Image className="cursor-pointer" src={Logo} alt="Logo" width={48} />
        <ul className="hidden md:flex items-center gap-4">
          <li
            className="text-yellow-500 font-bold cursor-pointer"
            onClick={() => onNavClick("reservation")}
          >
            Reservation
          </li>
          <li
            className="text-[#333] font-bold cursor-pointer hover:text-yellow-500"
            onClick={() => onNavClick("historique")}
          >
            Historique de reservation
          </li>
          <li
            className="text-[#333] font-bold cursor-pointer hover:text-yellow-500"
            onClick={() => onNavClick("statistiques")}
          >
            Statistiques
          </li>
        </ul>
      </div>
      <UserButton />
    </header>
  );
}
