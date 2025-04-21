import React, {useContext, useState} from "react";
import DishCard from "../Components/DishCard.jsx";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";
import {IoMdPricetags} from "react-icons/io";
import {BiRename} from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import {ProductContext} from "../Context/ProductContext.jsx";
import {CategoryContext} from "../Context/CategoryContext.jsx";

function Search() {
    const {productsSearch, formSearchAdv, searchAdv, updateFormSearchAdv} = useContext(ProductContext);
    const {categories} = useContext(CategoryContext);


    return (
        <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 gap-6">
            <h1 className=" text-4xl font-semibold text-center pt-28 mt-4">Busqueda</h1>
            <div className="w-full flex flex-col md:flex-row justify-start items-start gap-6">
                <div className="w-full md:w-[30%] flex flex-col justify-center items-start gap-6">
                    <div
                        className="w-full flex flex-col text-black p-8 gap-6 shadow-xl rounded-2xl bg-[#F5F5F5] transition-all duration-300 hover:shadow-2xl">
                        <form onSubmit={searchAdv} className="w-full flex flex-col gap-6">
                            <h1 className=" text-2xl font-semibold text-start">Filtros</h1>
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <BiRename className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formSearchAdv.searchText}
                                    onChange={e => updateFormSearchAdv({...formSearchAdv, searchText: e.target.value})}
                                />
                            </div>
                            <div
                                className="w-full flex items-center justify-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <IoMdPricetags className="text-gray-500 mr-3 text-lg"/>
                                <div className="space-y-2 flex flex-row items-center w-full gap-2 text-[#000000]">
                                    <span className="m-0">$0</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={formSearchAdv.maxPrice}
                                        onChange={e => updateFormSearchAdv({...formSearchAdv, maxPrice: e.target.value})}
                                        className="w-full m-0"
                                    />
                                    <span className="m-0">${formSearchAdv.maxPrice}</span>
                                </div>
                            </div>

                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <IoFilterSharp className="text-gray-500 mr-3 text-lg"/>
                                <select
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400 cursor-pointer"
                                    onChange={e => updateFormSearchAdv({
                                        ...formSearchAdv,
                                        idCategoria: e.target.value
                                    })}
                                    value={formSearchAdv.idCategoria}
                                >
                                    <option value="">Categoria</option>
                                    {categories.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="cursor-pointer w-full border-2 py-2 rounded-3xl hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="w-full md:w-[70%] justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productsSearch?.map((platillo) => (
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
        </div>

    );
}

export default Search;