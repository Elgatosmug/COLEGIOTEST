import { createContext, useContext, useState, useEffect } from 'react';

const RegistroContext = createContext();

export function RegistroProvider({ children }) {
    const [deportesRegistrados, setDeportesRegistrados] = useState(() => {
        // En modo de pruebas, usar localStorage si está disponible
        if (typeof window !== 'undefined') {
            const guardados = localStorage.getItem('deportesRegistrados');
            return guardados ? JSON.parse(guardados) : {};
        }
        return {};
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('deportesRegistrados', JSON.stringify(deportesRegistrados));
        }
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

    const registrarDeporte = (deporteId) => {
        setDeportesRegistrados(prev => ({
            ...prev,
            [deporteId]: true
        }));
    };

    const desregistrarDeporte = (deporteId) => {
        setDeportesRegistrados(prev => ({
            ...prev,
            [deporteId]: false
        }));
    };

    const obtenerDeportesRegistrados = () => {
        return deportesRegistrados;
    };

    return (
        <RegistroContext.Provider value={{ 
            deportesRegistrados, 
            toggleRegistro, 
            estaRegistrado,
            registrarDeporte,
            desregistrarDeporte,
            obtenerDeportesRegistrados
        }}>
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