// Modal de confirmación
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-gray-600 mb-6">
        {message}
      </div>
      <div className="flex space-x-4 justify-end">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal