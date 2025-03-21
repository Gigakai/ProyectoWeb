import React, {useState} from "react";
import DishCard from "../Components/DishCard.jsx";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";
import {IoMdPricetags} from "react-icons/io";
import {BiRename} from "react-icons/bi";
import {FaPercentage} from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

const dishes = [
    {id: 1, img: c1, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 1"},
    {id: 2, img: c2, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 2"},
    {id: 3, img: c3, title: "Tasty Dish", price: "$19.99", description: "Descripción del platillo 3"},
    {id: 4, img: c4, title: "Tasty Dish", price: "$11.99", description: "Descripción del platillo 4"},
    {id: 5, img: c5, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 5"},
    {id: 6, img: c6, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 6"},
];

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [dietaryOptions, setDietaryOptions] = useState({
        vegetariano: false,
        vegano: false,
        sinGluten: false,
    });

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState("relevancia");

    const categorias = [
        "Picoso", "Sabroso", "Salado", "Agridulce", "Pastas", "Mariscos"
    ];

    const [results] = useState([
        { id: 1, nombre: "Platillo 1", precio: 25.99, categoria: "Picoso", rating: 4.5 },
        { id: 2, nombre: "Platillo 2", precio: 18.50, categoria: "Vegano", rating: 4.8 },
    ]);

    const handleCategorySelect = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 gap-6">
            <h1 className=" text-4xl font-semibold text-center pt-28 mt-4">Busqueda</h1>
            <div className="w-full flex flex-col md:flex-row justify-center items-start gap-6">
                <div className="w-full md:w-[30%] flex flex-col justify-center items-start gap-6">
                    <div
                        className="w-full flex flex-col text-black p-8 gap-6 shadow-xl rounded-2xl bg-[#F5F5F5] transition-all duration-300 hover:shadow-2xl">
                        <form action="" className="w-full flex flex-col gap-6">
                            <h1 className=" text-2xl font-semibold text-start">Filtros</h1>
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <BiRename className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                    required
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
                                        max="100"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                                        className="w-full m-0"
                                    />
                                    <span className="m-0">${priceRange[1]}</span>
                                </div>
                            </div>

                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <IoFilterSharp className="text-gray-500 mr-3 text-lg"/>
                                <select
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400 cursor-pointer"
                                    required
                                >
                                    <option value="">Ordenar Por</option>
                                    <option value="">Mejor Valorados</option>
                                    <option value="">Precio Menor a Mayor</option>
                                    <option value="">Precio Mayor a Menor</option>
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
        </div>

    );
}

export default Search;