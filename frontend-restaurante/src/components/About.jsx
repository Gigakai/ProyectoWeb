import React from "react";
import img from '../assets/img.png';
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className="mt-12 min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 py-16 bg-gradient-to-b from-gray-50 to-gray-200">
      
      {/* Sección principal sobre GigaFood */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full">
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img 
            src={img} 
            alt="GigaFood" 
            className="w-80 lg:w-auto rounded-lg shadow-2xl transform hover:scale-105 transition duration-300" 
          />
        </div>
        
        <div className="w-full lg:w-1/2 lg:pl-12 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center lg:text-left">
          Sobre GigaFood
        </h1>
        <p className="text-gray-600 leading-relaxed text-justify">
          GigaFood es mucho más que una página de comida; es una experiencia culinaria creada para revolucionar la forma en que disfrutas de tus platillos favoritos. Fundada en el año 2025, GigaFood nació de la pasión compartida por Manuel Cruz y Gustavo Gómez, dos emprendedores visionarios que creyeron en la capacidad de transformar la industria gastronómica a través de la innovación y la calidad.
        </p>
        <p className="text-gray-600 leading-relaxed text-justify">
          Con el objetivo de ofrecer una plataforma integral, GigaFood reúne una amplia variedad de opciones que van desde los sabores más tradicionales hasta propuestas innovadoras y de fusión. La misión es clara: brindar a sus clientes una experiencia única, en la que cada pedido no solo sea delicioso, sino que también represente un compromiso con la calidad y el servicio excepcional.
        </p>
        <p className="text-gray-600 leading-relaxed text-justify">
          Manuel Cruz y Gustavo Gómez, con años de experiencia en el mundo culinario y la tecnología, se propusieron crear una Pagina que combinara lo mejor de ambos mundos. Su visión es crear una comunidad donde cada usuario pueda descubrir, compartir y disfrutar de la diversidad gastronómica, impulsando además el crecimiento de productores locales y emprendedores.
        </p>
        <p className="text-gray-600 leading-relaxed text-justify">
          Desde sus inicios, GigaFood ha trabajado incansablemente para innovar en la presentación de menús, la optimización de entregas y el fomento de una cultura gastronómica inclusiva y sostenible. Cada detalle, desde el diseño de la página hasta la selección de platillos, refleja el compromiso de los fundadores por elevar el estándar de la experiencia culinaria.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button title="Conoce Más" />
        </div>
      </div>
      </div>

      {/* Misión y valores */}
      <div className="mt-16 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800">Nuestra Misión</h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          En GigaFood, nuestra misión es conectar a los amantes de la gastronomía con una experiencia culinaria innovadora y de calidad. Nos esforzamos por ofrecer una plataforma intuitiva y accesible que permita a los usuarios descubrir nuevos sabores y disfrutar de sus comidas favoritas con facilidad y rapidez.
        </p>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
        <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
          <h3 className="text-xl font-bold text-gray-800">Innovación</h3>
          <p className="text-gray-600 mt-3">Nos mantenemos a la vanguardia tecnológica para brindar la mejor experiencia a nuestros usuarios.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
          <h3 className="text-xl font-bold text-gray-800">Calidad</h3>
          <p className="text-gray-600 mt-3">Seleccionamos los mejores ingredientes y restaurantes para garantizar una experiencia excepcional.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center flex-1">
          <h3 className="text-xl font-bold text-gray-800">Compromiso</h3>
          <p className="text-gray-600 mt-3">Apoyamos a emprendedores y pequeños negocios locales para impulsar la industria gastronómica.</p>
        </div>
      </div>

      <div className="mt-16 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800">Nuestro Impacto</h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Desde su lanzamiento, GigaFood ha logrado impactar a miles de usuarios, permitiendo que descubran nuevos restaurantes, platillos y experiencias gastronómicas únicas. Trabajamos con más de 500 socios comerciales y hemos gestionado más de 100,000 pedidos en menos de un año.
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
          Ya sea que seas un amante de la comida o un emprendedor gastronómico, GigaFood es el lugar ideal para ti. Descubre, pide y disfruta de los mejores platillos con solo un clic.
        </p>
      </div>

    </div>
  );
};

export default About;
