import React from "react"
import Header from './Header'
import Footer from './Footer'

export function Inscripciones() {
    return (
        <div className="font-sans flex flex-col items-center justify-center bg-gray-100 p-3 md:p-5 rounded-lg">
                <center>
                    <h1 className="text-base md:text-lg font-bold mb-4 md:mb-6 underline text-center px-2">VALORES QUE RIGEN PARA EL AÑO 2025</h1>
                </center>
                <article className="flex flex-col md:flex-row gap-4 md:gap-10 mb-5 w-full max-w-6xl justify-center items-center px-4 md:pl-4">
                    <section className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-4 rounded-lg w-full md:w-1/2 max-w-xs border h-auto md:h-48 mb-4 md:mb-0">
                        <dl className="m-0 p-0 grid grid-cols-2 gap-2 md:gap-4 items-center w-full">
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Afiliación por 1ra vez</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$30,00</dd>
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Inscripcion por Categoría</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$20,00</dd>
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Credenciales: cada una</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$6,00</dd>
                        </dl>
                    </section>
                    <section className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-4 rounded-lg w-full md:w-1/2 max-w-xs border h-auto md:h-48">
                        <dl className="m-0 p-0 grid grid-cols-2 gap-2 md:gap-4 items-center w-full">
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Inscripcion anual</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$30,00</dd>
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Impugnaciones</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$25,00</dd>
                            <dt className="block m-0 text-xs md:text-sm leading-5 md:leading-6 break-words md:whitespace-nowrap">Certificados deportivos</dt>
                            <dd className="block m-0 font-bold text-xs md:text-sm leading-5 md:leading-6 text-right">$10,00</dd>
                        </dl>
                    </section>
                </article>
                <article className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-5 rounded-lg w-full max-w-[685px] mb-5 mx-4 md:ml-4 md:pl-4 border">
                    <h2 className="mb-4 text-base md:text-lg font-bold">Documentos para inscripcion de alumnos(as) - deportistas</h2>
                    <ol className="space-y-2 md:space-y-3">
                        <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm leading-5 md:leading-6">
                            <svg className="h-4 w-4 md:h-[1lh] md:w-5.5 shrink-0 mt-0.5 md:mt-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span className="text-xs md:text-sm">Cedula de identidad original y actualizada(partida de nacimiento integra original, en caso de impugnación)<strong> ESTUDIANTE.</strong></span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm leading-5 md:leading-6">
                            <svg className="h-4 w-4 md:h-[1lh] md:w-5.5 shrink-0 mt-0.5 md:mt-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span className="text-xs md:text-sm">Certificado de matricula y asistencia normal a clases(general) <strong>UNIDAD EDUCATIVA.</strong></span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm leading-5 md:leading-6">
                            <svg className="h-4 w-4 md:h-[1lh] md:w-5.5 shrink-0 mt-0.5 md:mt-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span className="text-xs md:text-sm">Certificado de idoneidad médica(general) <strong>DOCTOR-UNIDAD EDUCATIVA.</strong></span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm leading-5 md:leading-6">
                            <svg className="h-4 w-4 md:h-[1lh] md:w-5.5 shrink-0 mt-0.5 md:mt-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span className="text-xs md:text-sm">1 foto actualizada, tamaño carnet, en la papeleta de inscripción <strong>ESTUDIANTE.</strong></span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm leading-5 md:leading-6">
                            <svg className="h-4 w-4 md:h-[1lh] md:w-5.5 shrink-0 mt-0.5 md:mt-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span className="text-xs md:text-sm">La papeleta de inscripción debe tener la información completa. Con los datos, firmas y sellos respectivos, requeridos en la misma.- <strong>UNIDAD EDUCATIVA.</strong></span>
                        </li>
                    </ol>
                    <br />
                    <p className="pl-1.5 mt-4 text-xs md:text-sm">En una carpeta: Se recibirán en fisico en la oficina de la FEDESTUDIANTIL-Guayas, para la entrega de las respectivas credenciales, una vez subidos los DATOS A LA PLATAFORMA - <strong>UNIDAD EDUCATIVA.</strong></p>
                </article>
                <aside className="flex flex-col items-start justify-center bg-gray-100 p-3 md:p-5 rounded-lg w-full max-w-2xl mx-4 md:pl-4">
                    <h2 className="mb-4 text-base md:text-lg font-bold"> NOTA IMPORTANTE:</h2>
                    <h2 className="text-sm md:text-lg font-bold">*UNIDADES EDUCATIVAS FISCALES, PAGARÁN EL 50% DE LOS VALORES DE PARTICIPACIÓN</h2>
                </aside>
        </div>
    )
}

export default Inscripciones;