import React from 'react';
import ModalPrecios from './modals/ModalPrecios';

const SeccionPrecios = ({ precios, modalPrecios, setModalPrecios, actualizarPrecio }) => {
    return (
        <>
            <article className="flex flex-row gap-10 mb-5 w-full justify-center items-stretch pl-4">
                <section className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-80 h-80">
                    <div className="flex justify-between items-center w-full mb-4">
                        <button 
                            onClick={() => setModalPrecios(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                        >
                            Modificar
                        </button>
                    </div>
                    <dl className="m-0 p-0 grid grid-cols-2 gap-2.5 items-start w-full">
                        <p className="block m-0 text-base leading-6 break-words">{precios.afiliacion.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20">{precios.afiliacion.precio}</p>
                        <p className="block m-0 text-base leading-6 break-words">{precios.inscripcionCategoria.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20">{precios.inscripcionCategoria.precio}</p>
                        <p className="block m-0 text-base leading-6 break-words">{precios.credenciales.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20 pr-2">{precios.credenciales.precio}</p>
                    </dl>
                </section>
                <section className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-80 h-80">
                    <div className="flex justify-between items-center w-full mb-4">
                        <button 
                            onClick={() => setModalPrecios(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md transition-colors mt-0 mb-0"
                        >
                            Modificar
                        </button>
                    </div>
                    <dl className="mt-0 grid grid-cols-2 gap-2.5 items-start w-full pt-0">
                        <p className="block m-0 text-base leading-6 break-words mb-1.5">{precios.inscripcionAnual.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20">{precios.inscripcionAnual.precio}</p>
                        <p className="block m-0 text-base leading-6 break-words mb-2">{precios.impugnaciones.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20">{precios.impugnaciones.precio}</p>
                        <p className="block m-0 text-base leading-6 break-words mb-2">{precios.certificados.nombre}</p>
                        <p className="block m-0 font-bold text-base leading-6 text-right min-w-20">{precios.certificados.precio}</p>
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
