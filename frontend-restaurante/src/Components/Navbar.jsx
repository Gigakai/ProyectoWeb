import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {BiRestaurant, BiSearch, BiSlider} from "react-icons/bi";
import Button from "../layouts/Button.jsx";
import {TransContext} from "../Context/TransContext.jsx";
import {FaFilter} from "react-icons/fa";

const Navbar = () => {
    const {setIsCartActive} = useContext(TransContext);

    const openCart = () => {
        setIsCartActive(true);
    }

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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

    const handleCategorySelect = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div
                className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                <div className="w-[40%] flex flex-row items-center gap-2">
                    <span>
                        <BiRestaurant color="black" size={32}/>
                    </span>
                    <h1 className="text-xl font-semibold ml-2">GigaFood</h1>
                    <div className="flex flex row items-center w-full justify-center gap-4 w-full">
                        <div className="w-full text-black relative flex flex-row">
                            <input
                                className="form-control w-full text-black border-2 rounded-full outline-hidden border-black px-2 py-1"
                                type="search" placeholder="Search" aria-label="Search"/>
                        </div>

                        <button
                            onClick={() => setShowAdvancedFilters(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <BiSlider className="text-2xl text-gray-600"/>
                        </button>
                    </div>
                </div>

                <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                    <Link to="/" className="hover:text-brightColor transition-all cursor-pointer">
                        Home
                    </Link>

                    <Link to="/about" className="hover:text-brightColor transition-all cursor-pointer">
                        About
                    </Link>
                    <Link to="/menu" className="hover:text-brightColor transition-all cursor-pointer">
                        Menu
                    </Link>
                    <Link to="/profile" className="hover:text-brightColor transition-all cursor-pointer">
                        Profile
                    </Link>
                    <button
                        className=" items-center flex flex-row hover:opacity-50 active:opacity-100 cursor-pointer"
                        onClick={openCart}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-1"
                            viewBox="0 0 576 512">
                            <path fill="#000000"
                                  d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </button>
                    <Link to="/login">
                        <Button title="Iniciar Sesión"/>
                    </Link>
                </nav>

            </div>

            {/* MODAL DE LOS FILTROS*/}
            {showAdvancedFilters && (
                <div
                    className="text-black fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <BiSlider className="text-yellow-500"/> Filtros Avanzados
                        </h2>

                        <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-black font-semibold mb-3">Rango de Precios</h3>
                                <div className="text-black space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>$/ 0</span>
                                        <span>$/ {priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-black font-semibold mb-3">Ordenar por</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-black w-full p-2 border rounded-lg"
                                >
                                    <option value="relevancia">Relevancia</option>
                                    <option value="precio-asc">Precio de Menor a Mayor</option>
                                    <option value="precio-desc">Precio de Mayor a Menor</option>
                                    <option value="rating">Mejor Valorados</option>
                                </select>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowAdvancedFilters(false)}
                                className="text-white bg-[#f25e53] hover:bg-[#f25e53b3] active:bg-[#f25e53] px-4 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Aplicar
                            </button>

                            <button
                                onClick={() => setShowAdvancedFilters(false)}
                                className="text-black bg-gray-200 hover:bg-gray-300 active:bg-gray-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
