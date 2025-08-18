import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistro } from '../contexts/RegistroDeporte';
import data from '../data.json';
import Card from './card';
import ConfirmModal from './ConfirmModal';

export const CardContainerAdmin = () => {
    const [extensions, setExtensions] = useState(data);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);
    const navigate = useNavigate();
    const { estaRegistrado } = useRegistro();

    const handleClick = (extension) => {
        // Navegar a la página de deporte con el nombre del deporte como parámetro
        navigate(`/deporte/${extension.name}`);
    };

    const handleClickBack = () => {
        navigate(`/deporte/`); //solo cambiar la ruta
    }

    const handleAgregarDeporte = () => {
        navigate(`/deporte/agregardeporte`); //solo cambiar la ruta
    }

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

    return (
        <div>
            hola
            <button onClick={handleClickBack} className='border font-bold px-5 py-1 mx-5 mt-5 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500'> ⬅️ Volver</button>
            <div className='mb-15 mt-10'> 
                <h1 className='text-5xl font-bold text-gray-800 px-6'>Deportes</h1>
            </div>

            <div className='flex m-6 gap-10 items center'>
                <button onClick={handleAgregarDeporte} className='border px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500'>Agregar deporte</button>
                <button 
                    className='border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-white hover:text-red-500'
                    onClick={handleDeleteModeToggle}
                >
                    {isDeleteMode ? 'Cancelar eliminación' : 'Eliminar deporte'}
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
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
                                className={`flex items-center mx-auto mb-3 border px-3 py-1 rounded-lg text-white hover:bg-white ${
                                    isDeleteMode 
                                        ? 'bg-red-500 hover:text-red-500' 
                                        : 'bg-blue-500 hover:text-blue-500'
                                }`}
                                onClick={() => {
                                    if (isDeleteMode) {
                                        handleOpenModal(extension.name);
                                    }
                                }}
                            >
                                {isDeleteMode ? 'eliminar deporte' : 'modificar deporte'}
                            </button>
                        </div>
                    )
                })
            }
            </div>

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