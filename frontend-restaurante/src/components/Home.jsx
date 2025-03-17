import React from "react";
import { Link } from "react-router-dom";
import { BiRestaurant, BiCartAlt, BiTimeFive, BiCheckShield } from "react-icons/bi";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/comida3.jpg')] bg-cover bg-no-repeat relative">
      {/* Capa de fondo oscuro para mejor legibilidad */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido Principal */}
      <div className="relative z-10 w-full lg:w-2/3 space-y-5 text-white">
        <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
          Bienvenido a <span className="text-yellow-400">GigaFood</span>, donde el sabor cobra vida.
        </h2>
        <p className="text-lg lg:text-2xl">
          🌶️🔥 Desde lo más picante hasta lo más delicioso, aquí encontrarás platillos irresistibles que llevarán tu paladar al siguiente nivel.  
          ¡Atrévete a probarlo y vive la experiencia <span className="text-yellow-400">GigaFood</span>! 🍔🍗🍕
        </p>

        {/* Botones de acción */}
        <div className="flex space-x-5">
          <Button title="Ordenar Ahora" />
          <Link to="/menu">
            <Button title="Ver Menú" />
          </Link>
        </div>
      </div>

      {/* Oferta Especial */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg text-center z-10">
        🎉 ¡Oferta Especial! 2x1 en todas las hamburguesas este fin de semana 🍔🔥
      </div>
      
    </div>
  );
};

export default Home;
