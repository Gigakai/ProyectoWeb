import React from "react";
import DishCard from "../layouts/DishCard";
import menu from "../assets/menu.jpg";
import menu1 from "../assets/menu1.jpg";
import menu2 from "../assets/menu2.jpg";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";


const Menu=() =>{
  return(
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
        <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">Premium Menu </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <DishCard img={menu} title="Tacos al Pastor" price="$16.99" />
            <DishCard img={menu1} title="Carne de cecina" price="$18.99" />
            <DishCard img={menu2} title="Pollo Salsaverde" price="$14.99" />

            <DishCard img={c1} title="Pollo rostizado" price="$10.99" />
            <DishCard img={c2} title="Omelet" price="$20.99" />
            <DishCard img={c3} title="Pasta pene" price="$15.99" />

            <DishCard img={c4} title="Brochetas" price="$11.99" />
            <DishCard img={c5} title="Ensalada" price="$12.99" />
            <DishCard img={c6} title="Aros de Queso" price="$9.99" />

        </div>


    </div>
  )
}

export default Menu
