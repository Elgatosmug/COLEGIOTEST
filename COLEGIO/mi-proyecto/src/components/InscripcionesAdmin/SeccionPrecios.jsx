import React from 'react';
import ModalPrecios from './modals/ModalPrecios';

const SeccionPrecios = ({ precios, modalPrecios, setModalPrecios, actualizarPrecio }) => {
    return (
        <>
            <article className="flex flex-col md:flex-row gap-4 md:gap-10 mb-5 w-full max-w-6xl justify-center items-center px-4 md:pl-4">
                <section className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-4 rounded-lg w-full md:w-1/2 max-w-xs border h-auto md:h-48 mb-4 md:mb-0">
                    <div className="flex justify-between items-center w-full mb-4">
                        <button 
                            onClick={() => setModalPrecios(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                        >
                            Modificar
                        </button>
                    </div>
                    <dl className="m-0 p-0 grid grid-cols-2 gap-2 md:gap-4 items-center w-full">
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.afiliacion.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.afiliacion.precio}</p>
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.inscripcionCategoria.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.inscripcionCategoria.precio}</p>
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.credenciales.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.credenciales.precio}</p>
                    </dl>
                </section>
                <section className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-4 rounded-lg w-full md:w-1/2 max-w-xs border h-auto md:h-48">
                    <div className="flex justify-between items-center w-full mb-4">
                        <button 
                            onClick={() => setModalPrecios(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors mt-0 mb-0"
                        >
                            Modificar
                        </button>
                    </div>
                    <dl className="m-0 p-0 grid grid-cols-2 gap-2 md:gap-4 items-center w-full">
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.inscripcionAnual.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.inscripcionAnual.precio}</p>
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.impugnaciones.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.impugnaciones.precio}</p>
                        <p className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">{precios.certificados.nombre}</p>
                        <p className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">{precios.certificados.precio}</p>
                    </dl>
                </section>
            </article>

            <ModalPrecios 
                modalPrecios={modalPrecios}
                setModalPrecios={setModalPrecios}
                precios={precios}
                actualizarPrecio={actualizarPrecio}
            />
        </>
    );
};

export default SeccionPrecios;
