import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistro } from '../contexts/RegistroDeporte';
import data from '../data.json';
import Card from './card';

export const CardContainer = () => {
    const [extensions, setExtensions] = useState(data);
    const navigate = useNavigate();
    const { estaRegistrado } = useRegistro();


    const handleClick = (extension) => {
        // Navegar a la página de deporte con el nombre del deporte como parámetro
        navigate(`/deporte/${extension.name}`);
    };

    const handleClickBack = () => {
        navigate(`/deporte/`); //solo cambiar la ruta
    }

    return (
        <div>
            <button onClick={handleClickBack} className='border font-bold px-5 py-1 mx-5 mt-5 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500'> ⬅️ Volver</button>
            <div className='mb-15 mt-10'> 
                <h1 className='text-5xl font-bold text-gray-800 px-6'>Deportes</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
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