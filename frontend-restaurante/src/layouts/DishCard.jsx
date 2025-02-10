import React from "react";
import {BsStarFill} from "react-icons/bs";
import {BsStarHalf} from "react-icons/bs";
import Button from "./Button";


const DishCard=(props) =>{
  return(
    <div className=" text-black w-full lg:w-1/4 p-5 shadow-[rgba(0,_0,_0.24)_0px_3px_8px] rounded-lg">  
      <img className="rounded-xl" src={props.img} alt="img"/>
      <div className=" space-y-4">
        <h3 className="font-semibold text-center text-xl pt-6">{props.title}</h3>
        <div className=" flex flex-row justify-center">
            <BsStarFill className=" text-brightColor"/>
            <BsStarFill className=" text-brightColor"/>
            <BsStarFill className=" text-brightColor"/>
            <BsStarFill className=" text-brightColor"/>
            <BsStarFill className=" text-brightColor"/>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
            <h3 className="font-semibold text-lg">{props.price}</h3>
            <Button title ="Comprar"/>
        </div>
      </div>
    </div>
  );
};

export default DishCard
