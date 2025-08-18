import React from 'react';
import ModalNotaImportante from './modals/ModalNotaImportante';

const NotaImportante = ({ 
    notaImportante, 
    modalNotaImportante, 
    setModalNotaImportante, 
    actualizarNotaImportante 
}) => {
    return (
        <>
            <aside className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-full max-w-2xl pl-4">
                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-lg font-bold"> NOTA IMPORTANTE:</h2>
                    <button 
                        onClick={() => setModalNotaImportante(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                    >
                        Modificar
                    </button>
                </div>
                <h2 className="text-lg font-bold">{notaImportante}</h2>
            </aside>

            <ModalNotaImportante 
                modalNotaImportante={modalNotaImportante}
                setModalNotaImportante={setModalNotaImportante}
                notaImportante={notaImportante}
                actualizarNotaImportante={actualizarNotaImportante}
            />
        </>
    );
};

export default NotaImportante;
