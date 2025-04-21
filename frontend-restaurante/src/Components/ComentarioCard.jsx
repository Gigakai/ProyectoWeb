import React from "react";
import './DishCard.css'
import moment from "moment/moment.js";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

function ComentarioCard(props){

    return (
        <div
            className="text-black bg-[#F5F5F5] rounded-xl shadow-[1px_10px_10px_rgba(0,0,0,0.3)] w-full h-[10em] flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex flex-col items-between justify-between space-y-4 w-full px-4 py-1 gap-1 w-full h-full">
                <div className="flex flex-col w-full h-full justify-between">
                    <div className="flex flex-row w-full justify-start p-2">
                        <div className="flex flex-row w-full gap-2 justify-start">
                            <img
                                src={props.avatar}
                                alt="Avatar"
                                className="w-[2em] h-[2em] rounded-full object-cover"
                            />
                            <h3 className="font-semibold text-start text-2xl w-full">{props.nombre}</h3>
                        </div>
                    </div>
                    <span
                        className="description p-2 flex flex-row w-full text-md overflow-hidden overflow-ellipsis">{props.texto}</span>

                    <div className="flex flex-row w-full justify-between p-2">
                        {(props.calificacion === "L") ? (
                         <>
                             <FaThumbsUp/>
                         </>
                        ):(
                         <>
                             <FaThumbsDown/>
                         </>
                        )
                        }
                        <div className="w-full flex justify-end items-center gap-1 flex-row justify-center">
                            <p>{moment(props.createdAt).calendar()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComentarioCard;