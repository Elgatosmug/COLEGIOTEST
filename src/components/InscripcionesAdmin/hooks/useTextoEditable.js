import { useState } from 'react';

export const useTextoEditable = () => {
    const [notaImportante, setNotaImportante] = useState("*UNIDADES EDUCATIVAS FISCALES, PAGARÁN EL 50% DE LOS VALORES DE PARTICIPACIÓN");
    const [infoCarpeta, setInfoCarpeta] = useState("En una carpeta: Se recibirán en fisico en la oficina de la FEDESTUDIANTIL-Guayas, para la entrega de las respectivas credenciales, una vez subidos los DATOS A LA PLATAFORMA - UNIDAD EDUCATIVA.");

    const [modalNotaImportante, setModalNotaImportante] = useState(false);
    const [modalInfoCarpeta, setModalInfoCarpeta] = useState(false);

    const actualizarNotaImportante = (nuevoTexto) => {
        setNotaImportante(nuevoTexto);
        setModalNotaImportante(false);
    };

    const actualizarInfoCarpeta = (nuevoTexto) => {
        setInfoCarpeta(nuevoTexto);
        setModalInfoCarpeta(false);
    };

    return {
        notaImportante,
        infoCarpeta,
        modalNotaImportante,
        setModalNotaImportante,
        modalInfoCarpeta,
        setModalInfoCarpeta,
        actualizarNotaImportante,
        actualizarInfoCarpeta
    };
};
