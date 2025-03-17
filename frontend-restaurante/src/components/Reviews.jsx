import React from "react";
import { BiStar, BiUserCircle, BiMap } from "react-icons/bi";
import Button from "../layouts/Button";


const Reviews = () => {
  return (
    <div className="relative py-16 bg-gray bg-opacity-70 pt-40">
      <div className="relative z-10 container mx-auto px-4">
      <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">
        Lo que dicen nuestros clientes
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-yellow-400 hover:bg-opacity-70 transition-all">
            <div className="flex items-center mb-4">
              <img 
                src="https://source.unsplash.com/100x100/?person" 
                alt="Usuario" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-white text-xl font-bold">Carlos Martínez</h3>
                <div className="flex items-center text-yellow-400">
                  <BiMap className="mr-2" />
                  <span className="text-sm">Guadalajara</span>
                </div>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <BiStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-white">
              "La mejor experiencia gastronómica que he tenido. Las hamburguesas son enormes y llenas de sabor. ¡Volveré una y otra vez!"
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-yellow-400 hover:bg-opacity-70 transition-all">
            <div className="flex items-center mb-4">
              <img 
                src="https://source.unsplash.com/100x100/?woman" 
                alt="Usuario" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-white text-xl font-bold">Ana Sánchez</h3>
                <div className="flex items-center text-yellow-400">
                  <BiMap className="mr-2" />
                  <span className="text-sm">Ciudad de México</span>
                </div>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <BiStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-white">
              "Increíble variedad de platillos picantes. El servicio fue excepcional y el ambiente perfecto para una cena especial."
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-yellow-400 hover:bg-opacity-70 transition-all">
            <div className="flex items-center mb-4">
              <img 
                src="https://source.unsplash.com/100x100/?man" 
                alt="Usuario" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-white text-xl font-bold">Luis González</h3>
                <div className="flex items-center text-yellow-400">
                  <BiMap className="mr-2" />
                  <span className="text-sm">Monterrey</span>
                </div>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(4)].map((_, i) => (
                <BiStar key={i} className="text-yellow-400" />
              ))}
              <BiStar className="text-gray-400" />
            </div>
            <p className="text-white">
              "Las porciones son generosas y los sabores auténticos. Mi único detalle sería ampliar la selección de postres."
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-800 text-White px-8 py-3 rounded-lg font-bold hover:bg-gray-950 transition-colors flex items-center mx-auto">
            <BiStar className="mr-2" />
            Ver más reseñas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;