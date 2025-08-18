import { useState } from 'react';

export const usePrecios = () => {
    const [precios, setPrecios] = useState({
        afiliacion: { nombre: "Afiliacion por 1ra vez", precio: "$30,00" },
        inscripcionCategoria: { nombre: "Inscripcion por Categoría", precio: "$20,00" },
        credenciales: { nombre: "Credenciales: cada una", precio: "$6,00" },
        inscripcionAnual: { nombre: "Inscripcion anual", precio: "$30,00" },
        impugnaciones: { nombre: "Impugnaciones", precio: "$25,00" },
        certificados: { nombre: "Certificados deportivos", precio: "$10,00" }
    });

    const [modalPrecios, setModalPrecios] = useState(false);

    const actualizarPrecio = (key, nuevoPrecio) => {
        setPrecios(prev => ({
            ...prev,
            [key]: { ...prev[key], precio: nuevoPrecio }
        }));
        setModalPrecios(false);
    };

    return {
        precios,
        modalPrecios,
        setModalPrecios,
        actualizarPrecio
    };
};
