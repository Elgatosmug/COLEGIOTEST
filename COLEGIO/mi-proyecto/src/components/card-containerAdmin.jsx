import { useState } from 'react';
import { useRegistro } from '../contexts/RegistroDeporte';
import data from '../data.json';
import deportesdata from '../deportesdata.json';
import Card from './card';
import ConfirmModal from './ConfirmModal';
import Tabla from "./Deporte";
import TablaEdades from './edades-superior';
import TablaEdadesInferior from './edades-inferior';

export const CardContainerAdmin = () => {
    const [extensions, setExtensions] = useState(data);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDeporte, setSelectedDeporte] = useState(null);
    const [showDeporteDetail, setShowDeporteDetail] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingDeporte, setEditingDeporte] = useState(null);
    const [newDeporte, setNewDeporte] = useState({
        name: '',
        logo: '',
        objetivo: '',
        metodologia: ''
    });
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

    const handleDeleteModeToggle = () => {
        setIsDeleteMode(!isDeleteMode);
    };

    const handleOpenModal = (sportName) => {
        setSelectedSport(sportName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSport(null);
    };

    const handleConfirmDelete = () => {
        if (selectedSport) {
            setExtensions(prevExtensions => 
                prevExtensions.filter(extension => extension.name !== selectedSport)
            );
            handleCloseModal();
        }
    };

    const handleAddDeporte = () => {
        setShowAddForm(true);
    };

    const handleBackFromAdd = () => {
        setShowAddForm(false);
        setNewDeporte({
            name: '',
            logo: '',
            objetivo: '',
            metodologia: ''
        });
    };

    const handleSaveNewDeporte = () => {
        if (newDeporte.name && newDeporte.logo) {
            const deporteToAdd = {
                ...newDeporte,
                id: Date.now().toString()
            };
            setExtensions(prevExtensions => [...prevExtensions, deporteToAdd]);
            handleBackFromAdd();
        }
    };

    const handleModifyDeporte = (deporte) => {
        setEditingDeporte(deporte);
        setShowEditForm(true);
    };

    const handleBackFromEdit = () => {
        setShowEditForm(false);
        setEditingDeporte(null);
    };

    const handleSaveEdit = () => {
        if (editingDeporte && editingDeporte.name && editingDeporte.logo) {
            setExtensions(prevExtensions => 
                prevExtensions.map(extension => 
                    extension.name === editingDeporte.name ? editingDeporte : extension
                )
            );
            handleBackFromEdit();
        }
    };

    // Filtrar datos por el deporte seleccionado
    const datosFiltrados = selectedDeporte ? deportesdata.filter(item => item.id === selectedDeporte.name) : [];

    // Si se está mostrando el formulario de editar deporte
    if (showEditForm && editingDeporte) {
        return (
            <div className="p-6">
                {/* Header con botón de volver */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Editar Deporte</h1>
                        <p className="text-gray-600 mt-2">Modifique la información del deporte: {editingDeporte.name}</p>
                    </div>
                    <button
                        onClick={handleBackFromEdit}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Cancelar
                    </button>
                </div>

                {/* Formulario de edición */}
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Deporte *
                            </label>
                            <input
                                type="text"
                                value={editingDeporte.name}
                                onChange={(e) => setEditingDeporte({...editingDeporte, name: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: Fútbol"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL del Logo *
                            </label>
                            <input
                                type="text"
                                value={editingDeporte.logo}
                                onChange={(e) => setEditingDeporte({...editingDeporte, logo: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://ejemplo.com/logo.png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Objetivo
                            </label>
                            <textarea
                                value={editingDeporte.objetivo || ''}
                                onChange={(e) => setEditingDeporte({...editingDeporte, objetivo: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Describir el objetivo del deporte..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Metodología
                            </label>
                            <textarea
                                value={editingDeporte.metodologia || ''}
                                onChange={(e) => setEditingDeporte({...editingDeporte, metodologia: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Describir la metodología..."
                            />
                        </div>
                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                onClick={handleBackFromEdit}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Si se está mostrando el formulario de agregar deporte
    if (showAddForm) {
        return (
            <div className="p-6">
                {/* Header con botón de volver */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Agregar Nuevo Deporte</h1>
                        <p className="text-gray-600 mt-2">Complete la información del nuevo deporte</p>
                    </div>
                    <button
                        onClick={handleBackFromAdd}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Cancelar
                    </button>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Deporte *
                            </label>
                            <input
                                type="text"
                                value={newDeporte.name}
                                onChange={(e) => setNewDeporte({...newDeporte, name: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: Fútbol"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL del Logo *
                            </label>
                            <input
                                type="text"
                                value={newDeporte.logo}
                                onChange={(e) => setNewDeporte({...newDeporte, logo: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://ejemplo.com/logo.png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Objetivo
                            </label>
                            <textarea
                                value={newDeporte.objetivo}
                                onChange={(e) => setNewDeporte({...newDeporte, objetivo: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Describir el objetivo del deporte..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Metodología
                            </label>
                            <textarea
                                value={newDeporte.metodologia}
                                onChange={(e) => setNewDeporte({...newDeporte, metodologia: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Describir la metodología..."
                            />
                        </div>
                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                onClick={handleBackFromAdd}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveNewDeporte}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Guardar Deporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Si se está mostrando el detalle del deporte
    if (showDeporteDetail && selectedDeporte) {
        return (
            <div className="p-6">
                {/* Header con botón de volver */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{selectedDeporte.name} - Vista de Administrador</h1>
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

                    {/* Botones de administración */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex justify-center items-center gap-6">
                            <button 
                                className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold transition-transform duration-300 hover:scale-105"
                                onClick={() => handleModifyDeporte(selectedDeporte)}
                            >
                                Editar Información
                            </button>
                            <button 
                                className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors text-lg font-semibold transition-transform duration-300 hover:scale-105"
                                onClick={() => handleOpenModal(selectedDeporte.name)}
                            >
                                Eliminar Deporte
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
                <h1 className='text-4xl font-bold text-gray-800'>Gestión de Deportes</h1>
                <p className="text-gray-600 mt-2">Administra todos los deportes del sistema</p>
            </div>

            <div className='flex gap-4 mb-6'>
                <button onClick={handleAddDeporte} className='border px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition-colors transition-transform duration-300 hover:scale-105'>
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar Deporte
                </button>
                <button 
                    className='border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors transition-transform duration-300 hover:scale-105'
                    onClick={handleDeleteModeToggle}
                >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleteMode ? 'Cancelar Eliminación' : 'Eliminar Deporte'}
                </button>
                <button
                    className='border px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-white hover:text-green-500 transition-colors transition-transform duration-300 hover:scale-105'
                    disabled
                >
                    Descargar lista de estudiantes registrados
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                extensions.map(extension => {
                    const registrado = estaRegistrado(extension.name);
                    
                    return (
                        <div 
                            key={extension.name}
                            className={`transition-all duration-300 justify-center bg-white overflow-hidden shadow-lg rounded-lg ${
                                registrado 
                                    ? 'border-2 border-green-500 shadow-lg' 
                                    : ''
                            }`}
                        >
                            <div 
                                onClick={() => handleClick(extension)} 
                                style={{ cursor: 'pointer' }}
                            >
                                <Card
                                    {...extension}
                                    registrado={registrado}
                                /> 
                            </div>
                            <button 
                                className={`flex items-center justify-center mx-auto mb-3 border px-3 py-1 rounded-lg text-white hover:bg-white transition-colors ${
                                    isDeleteMode 
                                        ? 'bg-red-500 hover:text-red-500' 
                                        : 'bg-blue-500 hover:text-blue-500'
                                }`}
                                onClick={() => {
                                    if (isDeleteMode) {
                                        handleOpenModal(extension.name);
                                    } else {
                                        handleModifyDeporte(extension);
                                    }
                                }}
                            >
                                {isDeleteMode ? 'Eliminar Deporte' : 'Modificar Deporte'}
                            </button>
                        </div>
                    )
                })
            }
            </div>

            {/* Modal de confirmación de eliminación */}
            <ConfirmModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirmar eliminación"
                message={`¿Estás seguro de que deseas eliminar el deporte "${selectedSport}"?`}
            />
        </div>
    );
};

export default CardContainerAdmin;