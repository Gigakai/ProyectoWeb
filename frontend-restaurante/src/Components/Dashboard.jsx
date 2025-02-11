import React from "react";
import DishCard from "../layouts/DishCard/DishCard.jsx";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";

function Dashboard(){
  return(
    <div className="flex flex-col justify-center items-center lg:px-32 px-5 py-5">
        <h1 className=" text-4xl font-semibold text-center py-10">Nuevos Platillos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex flex-wrap flex-row gap-6 justify-center">
            <DishCard img={c1} title="Tasty Dish" price="$10.99" description="Es un platillo muy bueno"/>
            <DishCard img={c2} title="Tasty Dish" price="$12.99" description="Es un platillo muy Italiano"/>
            <DishCard img={c3} title="Tasty Dish" price="$19.99" description="Es un platillo muy interesante"/>
        </div>
    </div>
  );
};

export default Dashboard;