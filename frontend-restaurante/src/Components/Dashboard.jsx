import React from "react";
import DishCard from "./DishCard.jsx";




function Dashboard({details, dishes}) {
    return (
        <div className="flex flex-col justify-center items-center lg:px-32 px-5 py-5">
            <h1 className=" text-4xl font-semibold text-center py-10">{details}</h1>
            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex flex-wrap flex-row gap-6 justify-center">
                {dishes.map((dish) => (
                    <DishCard key={dish.id} img={dish.img} title={dish.title} price={dish.price} description={dish.description} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard