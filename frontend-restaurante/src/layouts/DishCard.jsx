import React from "react";
import {BsStarFill} from "react-icons/bs";
import {BsStarHalf} from "react-icons/bs";
import Button from "./Button";
import './DishCard.css'
import {AiFillLike} from "react-icons/ai";

const DishCard = (props) => {
    return (
        <div
            className="text-black w-full bg-[#F5F5F5] rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)] min-h-[20rem] pb-4">
            <img className="coverDish rounded-t-xl w-full" src={props.img} alt="img"/>
            <div className="space-y-4 w-full px-4 py-1 gap-1">
                <div className="flex flex-row w-full justify-between">
                    <h3 className="font-semibold text-start text-3xl w-full">{props.title}</h3>
                    <div className="w-full flex justify-end items-center gap-1 flex flex-row justify-center">
                        <AiFillLike className="w-[1.4em] h-[1.4em] text-brightColor"/>
                        <span className="text-lg">50%</span>
                    </div>
                </div>
                <span className="description flex flex-row w-full text-md overflow-hidden overflow-ellipsis">{props.description}</span>
                <h3 className="font-semibold text-2xl">{props.price}</h3>
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    <button type="button" onClick={() => console.log("Button clicked!")}
                            className="cursor-pointer w-full border-2 py-2 rounded-3xl hover:bg-brightColor hover:text-[#f25e53] transition-all">Agregar
                        al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishCard
