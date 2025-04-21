import React from "react";
import './DishCard.css'

function CategoryCard(props){

    return (
        <div
            className="text-black bg-[#F5F5F5] rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)] w-full h-full flex flex-col justify-between pb-4 hover:shadow-lg transition">
            <div className="flex flex-col items-between justify-between space-y-4 w-full px-4 py-1 gap-1 w-full h-full">
                <div className="flex flex-col">
                    <div className="flex flex-row w-full justify-between">
                        <h3 className="font-semibold text-start text-3xl w-full">{props.nombre}</h3>
                        <div className="w-full flex justify-end items-center gap-1 flex-row justify-center">
                        </div>
                    </div>
                    <span
                        className="description flex flex-row w-full text-md overflow-hidden overflow-ellipsis">{props.descripcion}</span>
                </div>

                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    <button
                        onClick={() => props.openModal(props.id, props.nombre, props.descripcion)}
                        type="button"
                        className="cursor-pointer w-full border-2 py-2 rounded-3xl hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all w-full"
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;