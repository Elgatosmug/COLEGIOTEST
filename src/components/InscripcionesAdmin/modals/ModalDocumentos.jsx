import React from 'react';

const ModalDocumentos = ({ 
    modalDocumentos, 
    setModalDocumentos, 
    documentos, 
    editingDocumento, 
    setEditingDocumento, 
    actualizarDocumento
}) => {
    if (!modalDocumentos) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4">Modificar Documentos</h3>
                    <div className="space-y-4">
                        {documentos.map((doc) => (
                            <div key={doc.id} className="border border-gray-200 rounded p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Documento {doc.id}</span>
                                    <button
                                        onClick={() => setEditingDocumento(doc)}
                                        className="text-blue-500 hover:text-blue-600 text-sm"
                                    >
                                        Editar
                                    </button>
                                </div>
                                {editingDocumento?.id === doc.id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            defaultValue={doc.texto}
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            rows="2"
                                            onBlur={(e) => {
                                                const nuevoTexto = e.target.value;
                                                const nuevoResponsable = doc.responsable;
                                                actualizarDocumento(doc.id, nuevoTexto, nuevoResponsable);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={doc.responsable}
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            onBlur={(e) => {
                                                const nuevoResponsable = e.target.value;
                                                const nuevoTexto = doc.texto;
                                                actualizarDocumento(doc.id, nuevoTexto, nuevoResponsable);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-700">{doc.texto}</p>
                                        <p className="text-blue-600 font-semibold">{doc.responsable}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={() => setModalDocumentos(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDocumentos;
