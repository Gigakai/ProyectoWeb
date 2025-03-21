import React from "react";
import './DishCard.css'

function DishAdminCard(props){

    return (
        <div
            className="text-black w-full bg-[#F5F5F5] rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)] min-h-[20rem] pb-4 hover:shadow-lg transition"
        >
            <img className="coverDish rounded-t-xl w-full" src={props.img} alt="img"/>
            <div className="space-y-4 w-full px-4 py-1 gap-1">
                <div className="flex flex-row w-full justify-between">
                    <h3 className="font-semibold text-start text-3xl w-full">{props.title}</h3>
                    <div className="w-full flex justify-end items-center gap-1 flex-row justify-center">
                        Estado:
                        <span className="text-lg">Disponible</span>
                    </div>
                </div>
                <span
                    className="description flex flex-row w-full text-md overflow-hidden overflow-ellipsis">{props.description}</span>
                <div className="flex flex-row w-full justify-between">
                    <h3 className="font-semibold text-xl w-full">Precio: {props.price}</h3>
                    <h3 className="text-xl w-full text-end">Categoria: {props.categoria}</h3>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    <button
                        onClick={props.openModal}
                        type="button"
                        className="cursor-pointer w-full border-2 py-2 rounded-3xl hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all"
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishAdminCard;