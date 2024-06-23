import { FaMapPin } from "react-icons/fa";

export default function SearchForm() {
  return (
    <>
      <h1 className="font-bold mb-2 text-lg text-center text-black-400">
        Trajet
      </h1>
      <label className="font-bold mb-2 text-sm text-black-400">Départ</label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md mb-2">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input type="text" className="w-full pl-5 outline-none" />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Destination
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input type="text" className="w-full pl-5 outline-none" />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Date prevu de depart
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input
          type="text"
          className="w-full pl-5 outline-none"
          value="01 juin 2025"
        />
      </div>
      <label className="font-bold mb-2 text-sm text-black-400">
        Heure de depart
      </label>
      <div className="border border-gray-200 relative p-2 rounded-md shadow-md">
        <FaMapPin className="absolute left-2 top-3 text-black-400" />
        <input type="text" className="w-full pl-5 outline-none" value="12h00" />
      </div>
    </>
  );
}
