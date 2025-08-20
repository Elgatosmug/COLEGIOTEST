import React from 'react';

const ModalInfoCarpeta = ({ modalInfoCarpeta, setModalInfoCarpeta, infoCarpeta, actualizarInfoCarpeta }) => {
    if (!modalInfoCarpeta) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-bold mb-4">Modificar Información</h3>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Información</label>
                        <textarea
                            defaultValue={infoCarpeta}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows="4"
                            onBlur={(e) => actualizarInfoCarpeta(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={() => setModalInfoCarpeta(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalInfoCarpeta;
