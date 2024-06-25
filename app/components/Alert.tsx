import { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  let alertClasses = "p-3 rounded-md mb-2";
  let messageClasses = "text-gray-800";
  let buttonClasses = "bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none";

  if (type === "error") {
    alertClasses += " bg-red-100";
    messageClasses += " text-red-800";
  } else if (type === "success") {
    alertClasses += " bg-green-100";
    messageClasses += " text-green-800";
  } else if (type === "info") {
    alertClasses += " bg-blue-100";
    messageClasses += " text-blue-800";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-md shadow-lg w-96">
        <div className="mb-4">
          <div className={alertClasses}>
            <span className={messageClasses}>{message}</span>
          </div>
          <button onClick={handleClose} className={buttonClasses}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;



{/*import { useEffect } from "react";
import styles from "./Alert.module.css"; // Importez le fichier CSS que nous allons créer

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    // Auto-fermeture de l'alerte après 5 secondes
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // Nettoyez le timer lors de la fermeture de l'alerte
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
*/}