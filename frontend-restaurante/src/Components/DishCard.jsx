import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Button from "../layouts/Button.jsx";
import './DishCard.css'
import { AiFillLike } from "react-icons/ai";
import {ProductContext} from "../Context/ProductContext.jsx";
import {Bounce, toast} from "react-toastify";
import {TransContext} from "../Context/TransContext.jsx";

const DishCard = (props) => {
    const navigate = useNavigate();
    const {setProductoSeleccionado} = useContext(ProductContext)
    const {addItemToCart} = useContext(TransContext)

    const handleCardClick = () => {
        navigate(`/dish`);
        setProductoSeleccionado(props)
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();

        addItemToCart(props, 1)
    };

    return (
        <div
            onClick={handleCardClick}
            className="text-black w-full bg-[#F5F5F5] rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)] min-h-[20rem] pb-4 cursor-pointer hover:shadow-lg transition"
        >
            <img className="coverDish rounded-t-xl w-full" src={props.imagen} alt="img"/>
            <div className="space-y-4 w-full px-4 py-1 gap-1">
                <div className="flex flex-row w-full justify-between">
                    <h3 className="font-semibold text-start text-3xl w-full">{props.nombre}</h3>
                    <div className="w-full flex justify-end items-center gap-1 flex-row justify-center">
                        <AiFillLike className="w-[1.4em] h-[1.4em] text-brightColor"/>
                        <span className="text-lg">{props.calificacion}%</span>
                    </div>
                </div>
                <span className="description flex flex-row w-full text-md overflow-hidden overflow-ellipsis">{props.descripcion}</span>
                <h3 className="font-semibold text-2xl">{props.precio}</h3>
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    <button 
                        type="button" 
                        onClick={handleAddToCart}
                        className="cursor-pointer w-full border-2 py-2 rounded-3xl hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all"
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishCard;