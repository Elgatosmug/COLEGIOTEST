import React from "react"
import Header from './Header'
import Footer from './Footer'
import SeccionPrecios from './InscripcionesAdmin/SeccionPrecios'
import SeccionDocumentos from './InscripcionesAdmin/SeccionDocumentos'
import NotaImportante from './InscripcionesAdmin/NotaImportante'
import { usePrecios } from './InscripcionesAdmin/hooks/usePrecios'
import { useDocumentos } from './InscripcionesAdmin/hooks/useDocumentos'
import { useTextoEditable } from './InscripcionesAdmin/hooks/useTextoEditable'

export function InscripcionesAdmin() {
    // Estados y lógica modularizada
    const { precios, modalPrecios, setModalPrecios, actualizarPrecio } = usePrecios();
    const { documentos, modalDocumentos, setModalDocumentos, editingDocumento, setEditingDocumento, actualizarDocumento } = useDocumentos();
    const { 
        notaImportante, 
        infoCarpeta, 
        modalNotaImportante, 
        setModalNotaImportante, 
        modalInfoCarpeta, 
        setModalInfoCarpeta,
        actualizarNotaImportante,
        actualizarInfoCarpeta 
    } = useTextoEditable();

    return (
        <div className="font-sans flex flex-col items-center justify-center bg-gray-100 p-5 rounded-lg">
                <center>
                    <h1 className="text-lg font-bold">VALORES QUE RIGEN PARA EL AÑO 2025</h1>
                </center>
                
                {/* Sección de Precios */}
                <SeccionPrecios 
                    precios={precios}
                    modalPrecios={modalPrecios}
                    setModalPrecios={setModalPrecios}
                    actualizarPrecio={actualizarPrecio}
                />

                {/* Sección de Documentos */}
                <SeccionDocumentos 
                    documentos={documentos}
                    modalDocumentos={modalDocumentos}
                    setModalDocumentos={setModalDocumentos}
                    editingDocumento={editingDocumento}
                    setEditingDocumento={setEditingDocumento}
                    actualizarDocumento={actualizarDocumento}
                    infoCarpeta={infoCarpeta}
                    modalInfoCarpeta={modalInfoCarpeta}
                    setModalInfoCarpeta={setModalInfoCarpeta}
                    actualizarInfoCarpeta={actualizarInfoCarpeta}
                />

                {/* Nota Importante */}
                <NotaImportante 
                    notaImportante={notaImportante}
                    modalNotaImportante={modalNotaImportante}
                    setModalNotaImportante={setModalNotaImportante}
                    actualizarNotaImportante={actualizarNotaImportante}
                />
        </div>
    )
}

export default InscripcionesAdmin;