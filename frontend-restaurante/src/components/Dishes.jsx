import React from "react";
import DishCard from "../layouts/DishCard";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";

const Dishes=() =>{
  return(
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5"> 
        <h1 className=" text-4xl font-semibold text-center pt-24 pb-10">Nuestros Platillos</h1>
        <div className=" flex flex-wrap gap-8 justify-center">
            <DishCard img={c1} title="Tasty Dish" price="$10.99"/>
            <DishCard img={c2} title="Tasty Dish" price="$12.99"/>
            <DishCard img={c3} title="Tasty Dish" price="$19.99"/>
            <DishCard img={c4} title="Tasty Dish" price="$11.99"/>
            <DishCard img={c5} title="Tasty Dish" price="$10.99"/>
            <DishCard img={c6} title="Tasty Dish" price="$12.99"/>
        </div>
    </div>
  );
};

export default Dishes;
