import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { BiRestaurant, BiSearch, BiSlider } from "react-icons/bi";
import Button from "../layouts/Button";

const Navbar = () => {
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
      <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
        <div className="flex flex-row items-center cursor-pointer">
          <span>
            <BiRestaurant color="black" size={32} />
          </span>
          <h1 className="text-xl font-semibold ml-2">GigaFood</h1>
        </div>
        
        <div className="text-black flex items-center gap-4">
          <div className="text-black relative">
            <input
              type="text"
              placeholder="Buscar platillos..."
              className="p-2 pl-4 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-400 w-48 lg:w-64"
            />
            <button
                onClick={() => setShowAdvancedFilters(false)}
                className="text-white bg-white-200 px-4 py-2 rounded-lg transition-colors"
              >
                            <BiSearch className="absolute right-3 top-3 text-gray-400" />

                Cerrar
              </button>
          </div>
          
          <button
            onClick={() => setShowAdvancedFilters(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BiSlider className="text-2xl text-gray-600" />
          </button>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="/" className="hover:text-brightColor transition-all cursor-pointer">
              Home
            </Link>
          {/*   <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
              Dishes
            </Link> */}
            <Link to="/about" className="hover:text-brightColor transition-all cursor-pointer">
              About
            </Link>
            <Link to="/menu" className="hover:text-brightColor transition-all cursor-pointer">
              Menu
            </Link>
            <Link to="/profile" className="hover:text-brightColor transition-all cursor-pointer">
              Profile
            </Link>
            <Link to="/login">
              <Button title="Iniciar Sesión" />
            </Link>
          </nav>
        </div>
      </div>
      
      {/* MODAL DE LOS FILTROS*/}
      {showAdvancedFilters && (
        <div className="text-black fixed inset-0 bg-gradient-to-b from-black/60 via-gray-800/50 to-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BiSlider className="text-yellow-500" /> Filtros Avanzados
            </h2>

            <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="text-black font-semibold mb-3">Opciones Especiales</h3>
                <div className="text-black space-y-2">
                  {Object.keys(dietaryOptions).map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={dietaryOptions[option]}
                        onChange={() => setDietaryOptions(prev => ({
                          ...prev,
                          [option]: !prev[option]
                        }))}
                        className="rounded text-yellow-500 focus:ring-yellow-400"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold mb-3">Categorías</h3>
                <div className="text-black grid grid-cols-2 gap-2">
                  {categorias.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`p-2 rounded-lg text-sm ${
                        selectedCategories.includes(category)
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold mb-3">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-black w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
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
                className="text-black bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition-colors"
              >
                Aplicar
              </button>

              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="text-black bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
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
