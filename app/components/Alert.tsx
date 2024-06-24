import { useEffect } from "react";
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
