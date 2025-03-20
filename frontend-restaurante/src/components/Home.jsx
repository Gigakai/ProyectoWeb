import React from "react";
import { Link } from "react-router-dom";
import { BiRestaurant, BiCartAlt, BiTimeFive, BiCheckShield } from "react-icons/bi";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Sección Hero */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/comida3.jpg')] bg-cover bg-no-repeat relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full lg:w-2/3 space-y-5 text-white">
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
            Bienvenido a <span className="text-yellow-400">GigaFood</span>, donde el sabor cobra vida.
          </h2>
          <p className="text-lg lg:text-2xl">
            🌶️🔥 Desde lo más picante hasta lo más delicioso, aquí encontrarás platillos irresistibles que llevarán tu paladar al siguiente nivel.  
            ¡Atrévete a probarlo y vive la experiencia <span className="text-yellow-400">GigaFood</span>! 🍔🍗🍕
          </p>
          <div className="flex space-x-5">
            <Button title="Ordenar Ahora" />
            <Link to="/menu">
              <Button title="Ver Menú" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg text-center z-10">
          🎉 ¡Oferta Especial! 2x1 en todas las hamburguesas este fin de semana 🍔🔥
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-5 lg:px-32">
          <h3 className="text-black text-3xl lg:text-4xl font-bold text-center mb-12">¿Por qué elegir GigaFood?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <BiCartAlt className="text-yellow-500 text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Variedad en el Menú</h4>
              <p className="text-gray-600">
                Disfruta de una amplia selección de platillos para todos los gustos y ocasiones.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <BiTimeFive className="text-yellow-500 text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Entrega Rápida</h4>
              <p className="text-gray-600">
                Nuestro servicio garantiza entregas rápidas y comida siempre fresca.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <BiCheckShield className="text-yellow-500 text-5xl mb-4" />
              <h4 className="text-xl font-semibold mb-2">Calidad Garantizada</h4>
              <p className="text-gray-600">
                Solo utilizamos ingredientes de alta calidad para que cada bocado sea único.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="py-20 bg-yellow-400">
        <div className="container mx-auto px-5 lg:px-32 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">¡Únete a la revolución del sabor!</h3>
          <p className="text-white text-lg lg:text-xl mb-8">
            Explora nuestro menú y descubre el platillo perfecto para ti.
          </p>
          <div className="flex justify-center space-x-5">
            <Button title="Ordenar Ahora" />
            <Link to="/menu">
              <Button title="Ver Menú" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
