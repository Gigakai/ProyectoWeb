import React from "react"; 
import DishCard from "../layouts/DishCard";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";

const dishes = [
  { id: 1, img: c1, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 1" },
  { id: 2, img: c2, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 2" },
  { id: 3, img: c3, title: "Tasty Dish", price: "$19.99", description: "Descripción del platillo 3" },
  { id: 4, img: c4, title: "Tasty Dish", price: "$11.99", description: "Descripción del platillo 4" },
  { id: 5, img: c5, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 5" },
  { id: 6, img: c6, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 6" },
];

const Dishes = () => {
  return(
    <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5"> 
        <h1 className=" text-4xl font-semibold text-center pt-24 pb-10">Nuestros Platillos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <DishCard 
              key={dish.id}
              id={dish.id}
              img={dish.img}
              title={dish.title}
              price={dish.price}
              description={dish.description}
            />
          ))}
        </div>
    </div>
  );
};

export default Dishes;