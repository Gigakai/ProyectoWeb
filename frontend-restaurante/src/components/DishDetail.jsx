import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const DishDetail = () => {
  const { state: dishData } = useLocation();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", {
      ...dishData,
      quantity
    });
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto pt-28">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <Carousel
            showThumbs={true}
            showStatus={false}
            infiniteLoop={true}
            className="carousel-container"
          >
            <div>
              <img 
                src={dishData.img} 
                alt={dishData.title} 
                className="max-h-96 object-contain"
              />
            </div>
          </Carousel>
        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {dishData.title}
          </h1>
          
          <div className="mb-6">
            <span className="text-2xl font-semibold text-red-600">
              {dishData.price}
            </span>
            {dishData.originalPrice && (
              <span className="ml-2 text-gray-500 line-through">
                {dishData.originalPrice}
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Cantidad:</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full border hover:bg-gray-100"
              >
                <AiOutlineMinus className="w-5 h-5" />
              </button>
              <span className="text-xl w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full border hover:bg-gray-100"
              >
                <AiOutlinePlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg 
                     transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
          >
            Agregar al carrito
          </button>

          {dishData.description && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-3">Descripción del producto</h2>
              <p className="text-gray-600 leading-relaxed">
                {dishData.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Detalles del producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              • Ingredientes frescos y de alta calidad
              <br />
              • Preparado por chefs profesionales
              <br />
              • Tiempo de preparación: 15-20 minutos
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              • Opciones vegetarianas disponibles
              <br />
              • Ajustable a dietas especiales
              <br />
              • Servicio las 24 horas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;