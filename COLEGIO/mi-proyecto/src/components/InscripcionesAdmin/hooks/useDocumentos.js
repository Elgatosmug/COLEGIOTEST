import { useState } from 'react';

export const useDocumentos = () => {
    const [documentos, setDocumentos] = useState([
        { id: 1, texto: "Cedula de identidad original y actualizada(partida de nacimiento integra original, en caso de impugnación)", responsable: "ESTUDIANTE" },
        { id: 2, texto: "Certificado de matricula y asistencia normal a clases(general)", responsable: "UNIDAD EDUCATIVA" },
        { id: 3, texto: "Certificado de idoneidad médica(general)", responsable: "DOCTOR-UNIDAD EDUCATIVA" },
        { id: 4, texto: "1 foto actualizada, tamaño carnet, en la papeleta de inscripción", responsable: "ESTUDIANTE" },
        { id: 5, texto: "La papeleta de inscripción debe tener la información completa. Con los datos, firmas y sellos respectivos, requeridos en la misma.", responsable: "UNIDAD EDUCATIVA" }
    ]);

    const [modalDocumentos, setModalDocumentos] = useState(false);
    const [editingDocumento, setEditingDocumento] = useState(null);

    const actualizarDocumento = (id, nuevoTexto, nuevoResponsable) => {
        setDocumentos(prev => prev.map(doc => 
            doc.id === id 
                ? { ...doc, texto: nuevoTexto, responsable: nuevoResponsable }
                : doc
        ));
        setModalDocumentos(false);
        setEditingDocumento(null);
    };

    const agregarDocumento = (nuevoTexto, nuevoResponsable) => {
        const nuevoId = Math.max(...documentos.map(d => d.id)) + 1;
        setDocumentos(prev => [...prev, { id: nuevoId, texto: nuevoTexto, responsable: nuevoResponsable }]);
        setModalDocumentos(false);
    };

    return {
        documentos,
        modalDocumentos,
        setModalDocumentos,
        editingDocumento,
        setEditingDocumento,
        actualizarDocumento,
        agregarDocumento
    };
};
