import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistro } from '../contexts/RegistroDeporte';
import deportesdata from '../deportesdata.json';
import Tabla from "./Deporte";
import TablaEdades from './edades-superior';
import TablaEdadesInferior from './edades-inferior';
import data from '../data.json'


function PaginaDeporte() {
    const { deporteId } = useParams();
    const {estaRegistrado, toggleRegistro} = useRegistro();

    const navigate = useNavigate();

    const registrado = estaRegistrado(deporteId);
    //usar el registrado como estado en vez de como contexto
    // const [registrado, setRegistrado] = useState(() => {
    //     const guardado = localStorage.getItem(`registrado_${deporteId}`);
    //     return guardado ? JSON.parse(guardado) : false;
    // });

    //guarda el cambio del botón segun si está registrado o no 
    // useEffect(() => {
    //     localStorage.setItem(`registrado_${deporteId}`, JSON.stringify(registrado));
    // }, [registrado, deporteId]);




    const handleClickBack = () => {
        navigate("/deportes");
    }
    // Filtrar datos por el deporte seleccionado
    const datosFiltrados = deportesdata.filter(item => item.id === deporteId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleClick = () => {
        console.log('clic')
        // setRegistrado(!registrado)
        // console.log(registrado)
        toggleRegistro(deporteId);
    };

    return (
        <div>
            <button onClick={handleClickBack} className='border font-bold px-5 py-1 mx-5 mt-5 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500'> ⬅️ Volver</button>
            <h1 className="text-4xl font-bold text-gray-800 p-4 text-center">
                {deporteId}
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
                <h1 className="text-3xl font-bold text-gray-800 p-4">Horarios</h1>
            </div>

            <div className="border my-5 mx-12">
                <Tabla datos={datosFiltrados} />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-gray-800 p-4">Objetivo</h1>
                <p className="text-xl text-gray-800 p-4">
                    Desarrollar habilidades técnicas, trabajo en equipo y disciplina
                    {data.find(deporte => deporte.name === deporteId)?.objetivo || 'Información no disponible'} 
                </p>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-gray-800 p-4">Metodología</h1>
                <p className="text-xl text-gray-800 p-4">
                    Entrenamientos prácticos, teoría deportiva, juegos formativos
                    {data.find(deporte => deporte.name === deporteId)?.metodologia || 'Información no disponible'}
                </p>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 p-4">Edades que rigen para las categorías 2025</h1>
                <div className="border my-5 mx-12">
                <TablaEdades />
                </div>
                <p className="text-l text-gray-800 p-4">
                    En estas categorías pueden participar en la inmediata superior hasta 5 estudiantes - deportistas
                </p>
            </div>
            <div>
                <div className="border my-5 mx-12">
                <TablaEdadesInferior />
                </div>
                <p className="text-l text-gray-800 p-4">
                    En estas categorías escolares cada estudiante - deportista participará en la que corresponda a su edad
                </p>
            </div>
            <div className='flex m-6 justify-center items-center gap-4'>
                <p className="text-xl text-gray-800">
                    Haznos saber que deseas inscribirte ➡️
                </p>
                <button 
                className={`rounded-full px-5 py-2 transition-all duration-300 ${
                    registrado 
                        ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                        : 'border bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-black'
                }`}
                onClick={handleClick}
            >
                    {registrado ? 'Registrado' : 'Registrarse'}
                </button>
            </div>
        </div>
    );
}

export default PaginaDeporte;