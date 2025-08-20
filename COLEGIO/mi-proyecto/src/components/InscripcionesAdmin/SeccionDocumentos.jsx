import React from 'react';
import ModalDocumentos from './modals/ModalDocumentos';
import ModalInfoCarpeta from './modals/ModalInfoCarpeta';

const SeccionDocumentos = ({ 
    documentos, 
    modalDocumentos, 
    setModalDocumentos, 
    editingDocumento, 
    setEditingDocumento, 
    actualizarDocumento,
    infoCarpeta,
    modalInfoCarpeta,
    setModalInfoCarpeta,
    actualizarInfoCarpeta
}) => {
    return (
        <>
            <article className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-full max-w-2xl mb-5 pl-4 border">
                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-lg font-bold">Documentos para inscripcion de alumnos(as) - deportistas</h2>
                    <button 
                        onClick={() => setModalDocumentos(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                    >
                        Modificar
                    </button>
                </div>
                <ol className="space-y-3 w-full">
                    {documentos.map((doc) => (
                        <li key={doc.id} className="flex items-start gap-3 text-base leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>{doc.texto} <strong>{doc.responsable}.</strong></span>
                        </li>
                    ))}
                </ol>
                <br />
                <div className="flex justify-between items-start w-full mb-4">
                    <p className="pl-1.5 mt-4 flex-1">{infoCarpeta}</p>
                    <button 
                        onClick={() => setModalInfoCarpeta(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors ml-2"
                    >
                        Modificar
                    </button>
                </div>
            </article>

            <ModalDocumentos 
                modalDocumentos={modalDocumentos}
                setModalDocumentos={setModalDocumentos}
                documentos={documentos}
                editingDocumento={editingDocumento}
                setEditingDocumento={setEditingDocumento}
                actualizarDocumento={actualizarDocumento}
            />

            <ModalInfoCarpeta 
                modalInfoCarpeta={modalInfoCarpeta}
                setModalInfoCarpeta={setModalInfoCarpeta}
                infoCarpeta={infoCarpeta}
                actualizarInfoCarpeta={actualizarInfoCarpeta}
            />
        </>
    );
};

export default SeccionDocumentos;
