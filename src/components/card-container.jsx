import { useState } from 'react';
import { useRegistro } from '../contexts/RegistroDeporte';
import data from '../data.json';
import deportesdata from '../deportesdata.json';
import Card from './card';
import Tabla from "./Deporte";
import TablaEdades from './edades-superior';
import TablaEdadesInferior from './edades-inferior';

export const CardContainer = () => {
    const [extensions, setExtensions] = useState(data);
    const [selectedDeporte, setSelectedDeporte] = useState(null);
    const [showDeporteDetail, setShowDeporteDetail] = useState(false);
    const { estaRegistrado, toggleRegistro } = useRegistro();

    const handleClick = (extension) => {
        setSelectedDeporte(extension);
        setShowDeporteDetail(true);
    };

    const handleBackToCards = () => {
        setShowDeporteDetail(false);
        setSelectedDeporte(null);
    };

    const handleRegistro = () => {
        if (selectedDeporte) {
            toggleRegistro(selectedDeporte.name);
        }
    };

    // Filtrar datos por el deporte seleccionado
    const datosFiltrados = selectedDeporte ? deportesdata.filter(item => item.id === selectedDeporte.name) : [];

    // Si se está mostrando el detalle del deporte
    if (showDeporteDetail && selectedDeporte) {
        return (
            <div className="p-6">
                {/* Header con botón de volver */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{selectedDeporte.name}</h1>
                        <p className="text-gray-600 mt-2">Información detallada del deporte</p>
                    </div>
                    <button
                        onClick={handleBackToCards}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver a Deportes
                    </button>
                </div>

                {/* Contenido del deporte */}
                <div className="space-y-8">
                    {/* Imagen y descripción básica */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center space-x-8">
                            <img 
                                src={selectedDeporte.logo} 
                                alt={selectedDeporte.name} 
                                className="w-40 h-40 object-contain"
                            />
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                    {selectedDeporte.name}
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {selectedDeporte.objetivo || 'Información no disponible'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Horarios</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <Tabla datos={datosFiltrados} />
                        </div>
                    </div>

                    {/* Objetivo */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Objetivo</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {selectedDeporte.objetivo || 'Desarrollar habilidades técnicas, trabajo en equipo y disciplina'}
                        </p>
                    </div>

                    {/* Metodología */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Metodología</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {selectedDeporte.metodologia || 'Entrenamientos prácticos, teoría deportiva, juegos formativos'}
                        </p>
                    </div>

                    {/* Edades */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Edades que rigen para las categorías 2025</h3>
                        
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Categorías Superiores</h4>
                            <div className="border rounded-lg overflow-hidden mb-4">
                                <TablaEdades />
                            </div>
                            <p className="text-sm text-gray-600">
                                En estas categorías pueden participar en la inmediata superior hasta 5 estudiantes - deportistas
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Categorías Escolares</h4>
                            <div className="border rounded-lg overflow-hidden mb-4">
                                <TablaEdadesInferior />
                            </div>
                            <p className="text-sm text-gray-600">
                                En estas categorías escolares cada estudiante - deportista participará en la que corresponda a su edad
                            </p>
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex justify-center items-center gap-6">
                            <p className="text-xl text-gray-800">
                                Haznos saber que deseas inscribirte ➡️
                            </p>
                            <button 
                                className={`rounded-full px-8 py-4 transition-all duration-300 text-lg font-semibold ${
                                    estaRegistrado(selectedDeporte.name)
                                        ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                                        : 'border-2 border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500'
                                }`}
                                onClick={handleRegistro}
                            >
                                {estaRegistrado(selectedDeporte.name) ? 'Registrado' : 'Registrarse'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vista normal de cards
    return (
        <div className="p-6">
            <div className='mb-6'> 
                <h1 className='text-4xl font-bold text-gray-800'>Deportes</h1>
                <p className="text-gray-600 mt-2">Explora todos los deportes disponibles</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                extensions.map(extension => {
                    const registrado = estaRegistrado(extension.name);

                    return (
                        <div 
                            key={extension.name} 
                            onClick={() => handleClick(extension)} 
                            style={{ cursor: 'pointer' }}
                            className={`transition-all duration-300 justify-center rounded-lg ${
                                registrado 
                                    ? 'border-2 border-green-500 shadow-lg' 
                                    : ''
                            }`}
                        >
                            <Card
                               {...extension}
                                registrado={registrado} // Pasar el estado al Card
                            /> 
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
};

export default CardContainer