import React from "react";
import img from '../assets/img.png';
import Button from "../layouts/Button";


const About=() =>{
  return(
    <div className="text-black min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5">
        <img src={img} alt="img"/>

        <div className="space-y-4 lg:pt-14">
            <h1 className="font-semibold text-4xl text-center md:text-center md:text-start">Why Choose Us?</h1>
            <p> 
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
             Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
             cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
             galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. 
             No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos
              electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con
               la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y 
               más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual 
               incluye versiones de Lorem Ipsum.
            </p>
            <p>Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. 
                Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo</p>
            <div className="flex justify-center lg:justify-start">
                <Button title="Learn More" />
            </div>
        </div>
    </div>
  )
}

export default About
