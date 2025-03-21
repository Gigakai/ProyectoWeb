import React from "react";
import img from '../assets/img.png';
import Button from "../layouts/Button.jsx";
import "./About.css";

const About = () => {
    return (
        <main
            className="text-black min-h-screen flex flex-col justify-center items-center lg:px-32 px-10 gap-6">

            <div className="text-black min-h-screen flex flex-col xl:flex-row justify-center items-center gap-6">
                <img className="w-full xl:w-[50%] coverAbout rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)]"
                     src="https://p1.socds.net/llp/5944/photo_upload_64f9357a60e93-2023-09-07.jpg" alt="img"/>

                <div className="space-y-4 lg:pt-14 flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-4xl text-center md:text-center md:text-start w-[100%] ">¿Porque comprar con nosotros?</h1>
                    <p>
                        GigaFood es mucho más que una página de comida; es una experiencia culinaria creada para revolucionar la forma en que disfrutas de tus platillos favoritos. Fundada en el año 2025, GigaFood nació de la pasión compartida por Manuel Cruz y Gustavo Gómez, dos emprendedores visionarios que creyeron en la capacidad de transformar la industria gastronómica a través de la innovación y la calidad.
                    </p>
                    <div className="flex justify-center lg:justify-start">

                    </div>
                </div>
            </div>


            {/* Sección principal sobre GigaFood */}

            {/* Misión y valores */}
            <div className="mt-2 text-center w-full max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">Nuestra Misión</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    En GigaFood, nuestra misión es conectar a los amantes de la gastronomía con una experiencia
                    culinaria innovadora y de calidad. Nos esforzamos por ofrecer una plataforma intuitiva y accesible
                    que permita a los usuarios descubrir nuevos sabores y disfrutar de sus comidas favoritas con
                    facilidad y rapidez.
                </p>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-xl font-bold text-gray-800">Innovación</h3>
                    <p className="text-gray-600 mt-3">Nos mantenemos a la vanguardia tecnológica para brindar la mejor
                        experiencia a nuestros usuarios.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-xl font-bold text-gray-800">Calidad</h3>
                    <p className="text-gray-600 mt-3">Seleccionamos los mejores ingredientes y restaurantes para
                        garantizar una experiencia excepcional.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-xl font-bold text-gray-800">Compromiso</h3>
                    <p className="text-gray-600 mt-3">Apoyamos a emprendedores y pequeños negocios locales para impulsar
                        la industria gastronómica.</p>
                </div>
            </div>

            <div className="mt-16 text-center w-full max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800">Nuestro Impacto</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    Desde su lanzamiento, GigaFood ha logrado impactar a miles de usuarios, permitiendo que descubran
                    nuevos restaurantes, platillos y experiencias gastronómicas únicas. Trabajamos con más de 500 socios
                    comerciales y hemos gestionado más de 100,000 pedidos en menos de un año.
                </p>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">500+</h3>
                    <p className="text-gray-600 mt-2">Restaurantes Asociados</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">100,000+</h3>
                    <p className="text-gray-600 mt-2">Pedidos Entregados</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">50,000+</h3>
                    <p className="text-gray-600 mt-2">Clientes Satisfechos</p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">Únete a la Revolución Culinaria</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    Ya sea que seas un amante de la comida o un emprendedor gastronómico, GigaFood es el lugar ideal
                    para ti. Descubre, pide y disfruta de los mejores platillos con solo un clic.
                </p>
            </div>


        </main>
    )
}

export default About
