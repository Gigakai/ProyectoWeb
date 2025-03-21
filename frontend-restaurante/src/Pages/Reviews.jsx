import React from "react";
import {BiStar} from "react-icons/bi";
import Review from "../Components/Review.jsx";

const reviewsInfo = [
    { id: 1, icon: "https://source.unsplash.com/100x100/?person", rating: 5, name: "Carlos Martínez", state: "Guadalajara", description: "La mejor experiencia gastronómica que he tenido. Las hamburguesas son enormes y llenas de sabor. ¡Volveré una y otra vez!" },
    { id: 2, icon: "https://source.unsplash.com/100x100/?woman", rating: 5, name: "Ana Sánchez", state: "Ciudad de México", description: "Increíble variedad de platillos picantes. El servicio fue excepcional y el ambiente perfecto para una cena especial." },
    { id: 3, icon: "https://source.unsplash.com/100x100/?man", rating: 3, name: "Luis González", state: "Monterrey", description: "Las porciones son generosas y los sabores auténticos. Mi único detalle sería ampliar la selección de postres." }
]

const Reviews = () => {
    return (
        <div className="relative min-h-screen py-16 bg-gray bg-opacity-70 pt-40 flex flex-col justify-center lg:px-34 px-5">
            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">
                    Lo que dicen nuestros clientes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex flex-wrap flex-row gap-8 justify-center">
                    {reviewsInfo.map((reviewInstance) => (
                        <Review key={reviewInstance.id} data={reviewInstance} />
                    ))}
               </div>

                <div className="text-center mt-12">
                    <button
                        className="bg-gray-800 text-White px-8 py-3 rounded-lg font-bold hover:bg-gray-950 transition-colors flex items-center mx-auto">
                        <BiStar className="mr-2"/>
                        Ver más reseñas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;