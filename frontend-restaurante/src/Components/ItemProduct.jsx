import React, {useContext} from "react";
import { FaTrashAlt } from "react-icons/fa";
import {TransContext} from "../Context/TransContext.jsx";

function ItemProduct(props) {
    const {removeItem} = useContext(TransContext)

    const handleTrashClick = () => {
        removeItem(props.id)
    };

    return (
        <>
            <div className="flex flex-row w-full items-center justify-start">
                <div className="p-2">
                    <img className="w-12 h-12 rounded-[50%] object-cover" src={props.imagen} alt=""/>
                </div>
                <div className="flex flex-row justify-between w-[85%]">
                    <div className="flex flex-col items-start w-[80%] px-1">
                        <p className="text-lg text-black font-medium text-start">{props.nombre}</p>
                        <span className="text-base text-black">Cantidad: {props.cantidad}</span>
                    </div>
                    <div className="flex flex-col items-end w-[20%] px-1">
                        <p className="text-lg text-black font-medium">${props.precio}</p>
                        <div className="flex flex-row items-center justify-center gap-1">

                            <button onClick={handleTrashClick} className="cursor-pointer text-base text-[#f25e53] hover:text-[#f25e53b3] active:text-[#f25e53] p-1"><FaTrashAlt /></button>
                        </div>

                    </div>
                </div>

            </div>
            <div className="flex items-center w-full justify-center">
                <hr className="text-[#f25e53] my-2 bg-[#f25e53] w-[90%] shadow-lg shadow-[#f25e53]"/>
            </div>
        </>
    )
}

export default ItemProduct