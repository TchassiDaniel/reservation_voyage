import React from 'react';

const ModalAlert = ({ message, type, showModal, closeModal }) => {
  if (!showModal) return null;

  const getColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <div className={`${getColor(type)} text-white p-2 rounded-md mb-2`}>
          {message}
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={closeModal}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;
