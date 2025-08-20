import React from "react"
import Header from './Header'
import Footer from './Footer'

export function Inscripciones() {
    return (
        <div className="font-sans flex flex-col items-center justify-center bg-gray-100 p-5 rounded-lg">
                <center>
                    <h1 className="text-lg font-bold mb-6 underline">VALORES QUE RIGEN PARA EL AÑO 2025</h1>
                </center>
                <article className="flex flex-row gap-10 mb-5 w-full max-w-6xl justify-center items-center pl-4">
                    <section className="flex flex-col items-start justify-center bg-gray-100 p-4 rounded-lg w-1/2 max-w-xs border h-48">
                        <dl className="m-0 p-0 grid grid-cols-2 gap-4 items-center w-full">
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Afiliación por 1ra vez</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$30,00</dd>
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Inscripcion por Categoría</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$20,00</dd>
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Credenciales: cada una</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$6,00</dd>
                        </dl>
                    </section>
                    <section className="flex flex-col items-start justify-center bg-gray-100 p-4 rounded-lg w-1/3 max-w-xs border h-48">
                        <dl className="m-0 p-0 grid grid-cols-2 gap-4 items-center w-full">
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Inscripcion anual</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$30,00</dd>
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Impugnaciones</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$25,00</dd>
                            <dt className="block m-0 text-sm leading-6 whitespace-nowrap">Certificados deportivos</dt>
                            <dd className="block m-0 font-bold text-sm leading-6 text-right">$10,00</dd>
                        </dl>
                    </section>
                </article>
                <article className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-full max-w-[685px] mb-5 ml-4 pl-4 border">
                    <h2 className="mb-4 text-lg font-bold">Documentos para inscripcion de alumnos(as) - deportistas</h2>
                    <ol className="space-y-3">
                        <li className="flex items-start gap-3 text-sm leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>Cedula de identidad original y actualizada(partida de nacimiento integra original, en caso de impugnación)<strong> ESTUDIANTE.</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>Certificado de matricula y asistencia normal a clases(general) <strong>UNIDAD EDUCATIVA.</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>Certificado de idoneidad médica(general) <strong>DOCTOR-UNIDAD EDUCATIVA.</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>1 foto actualizada, tamaño carnet, en la papeleta de inscripción <strong>ESTUDIANTE.</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm leading-6">
                            <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                                <circle cx="11" cy="11" r="11" className="fill-black-100" />
                                <circle cx="11" cy="11" r="10.5" className="stroke-black-200" />
                                <path d="M8 11.5L10.5 14L14 8" className="stroke-green-600" />
                            </svg>
                            <span>La papeleta de inscripción debe tener la información completa. Con los datos, firmas y sellos respectivos, requeridos en la misma.- <strong>UNIDAD EDUCATIVA.</strong></span>
                        </li>
                    </ol>
                    <br />
                    <p className="pl-1.5 mt-4 text-sm">En una carpeta: Se recibirán en fisico en la oficina de la FEDESTUDIANTIL-Guayas, para la entrega de las respectivas credenciales, una vez subidos los DATOS A LA PLATAFORMA - <strong>UNIDAD EDUCATIVA.</strong></p>
                </article>
                <aside className="flex flex-col items-start justify-center bg-gray-100 p-5 rounded-lg w-full max-w-2xl pl-4">
                    <h2 className="mb-4 text-lg font-bold"> NOTA IMPORTANTE:</h2>
                    <h2 className="text-lg font-bold">*UNIDADES EDUCATIVAS FISCALES, PAGARÁN EL 50% DE LOS VALORES DE PARTICIPACIÓN</h2>
                </aside>
        </div>
    )
}

export default Inscripciones;