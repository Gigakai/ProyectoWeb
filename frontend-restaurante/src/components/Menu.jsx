import React from "react";
import DishCard from "../layouts/DishCard";
import menu from "../assets/menu.jpg";
import menu1 from "../assets/menu1.jpg";
import menu2 from "../assets/menu2.jpg";


const Menu=() =>{
  return(
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
        <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">Premium Menu </h1>

        <div className="flex flex-wrap gap-8 justify-center">
            <DishCard img={menu} title="Delicious Dish" price="$16.99" />
            <DishCard img={menu1} title="Delicious Dish" price="$18.99" />
            <DishCard img={menu2} title="Delicious Dish" price="$14.99" />

        </div>


    </div>
  )
}

export default Menu
