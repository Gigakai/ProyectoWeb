import React, {useContext} from "react";
import DishCard from "../Components/DishCard.jsx";
import HorizontalScrollBar from "../Components/HorizontalScrollBar.jsx";
import {ProductContext} from "../Context/ProductContext.jsx";

const Menu=() =>{
    const {productsMenu} = useContext(ProductContext)

    return(
      <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 gap-6">
          <h1 className=" text-4xl font-semibold text-center pt-28 mt-4">Menu</h1>
          <section className="relative m-[0 80px] w-full">
              <HorizontalScrollBar/>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {productsMenu?.map((platillo) => (
                  <DishCard
                      key={platillo.id}
                      id={platillo.id}
                      imagen={platillo.imagen}
                      nombre={platillo.nombre}
                      precio={platillo.precio}
                      descripcion={platillo.descripcion}
                      Categoria={platillo.Categoria}
                      calificacion={platillo.calificacion}
                  />
              ))}
          </div>
      </div>
    )
}

export default Menu
