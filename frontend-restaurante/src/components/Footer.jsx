import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-300 text-white rounded-t-3xl mt-8 md:mt-8">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:w-1/4 text-white">
          <h1 className="font-semibold text-xl pb-4 text-black bg-gray-300">GigaFood</h1>
          <p className="text-sm text-black bg-gray-300 ">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
            Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
          </p>
        </div>

        <div className="bg-gray-300 text-white ">
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="text-black flex flex-col gap-2">
            <a className="transition-all cursor-pointer text-white" href="/">Dishes</a>
            <a className=" transition-all cursor-pointer text-white" href="/">About</a>
            <a className=" transition-all cursor-pointer text-white" href="/">Menu</a>
            <a className=" transition-all cursor-pointer text-white" href="/">Reviews</a>
          </nav>
        </div>

        <div className="bg-gray-300 text-white ">
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className="text-black flex flex-col gap-2">
            <a className="transition-all cursor-pointer text-white" href="/">Our Dishes</a>
            <a className=" transition-all cursor-pointer text-white" href="/">Premium Menu</a>
          </nav>
        </div>
        
        <div className="bg-gray-300 text-white ">
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contáctanos</h1>
          <nav className="text-black flex flex-col gap-2">
            <a className="transition-all cursor-pointer text-white" href="/">https://github.com/Gigakai/ProyectoWeb/tree/dev-Gustavo</a>
            <a className=" transition-all cursor-pointer text-white" href="/">+52 768 110 6299</a>
            <a className=" transition-all cursor-pointer text-white" href="/">Social Media</a>
          </nav>
        </div>
      </div>
      <div>
        <p className="text-center py-4 text-black bg-gray-300">
          © Copyright developed by 
          <span className="text-brightColor"> Gigakai & ManuelXCruz </span> | All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
