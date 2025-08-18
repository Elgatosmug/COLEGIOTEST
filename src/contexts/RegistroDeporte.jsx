// contexts/RegistroContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const RegistroContext = createContext();

export function RegistroProvider({ children }) {
    const [deportesRegistrados, setDeportesRegistrados] = useState(() => {
        const guardados = localStorage.getItem('deportesRegistrados');
        return guardados ? JSON.parse(guardados) : {};
    });

    useEffect(() => {
        localStorage.setItem('deportesRegistrados', JSON.stringify(deportesRegistrados));
    }, [deportesRegistrados]);

    const toggleRegistro = (deporteId) => {
        setDeportesRegistrados(prev => ({
            ...prev,
            [deporteId]: !prev[deporteId]
        }));
    };

    const estaRegistrado = (deporteId) => {
        return deportesRegistrados[deporteId] || false;
    };

    return (
        <RegistroContext.Provider value={{ deportesRegistrados, toggleRegistro, estaRegistrado }}>
            {children}
        </RegistroContext.Provider>
    );
}

export function useRegistro() {
    const context = useContext(RegistroContext);
    if (!context) {
        throw new Error('useRegistro debe usarse dentro de RegistroProvider');
    }
    return context;
}