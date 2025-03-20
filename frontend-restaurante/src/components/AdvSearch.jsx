import React, { useState } from "react";
import { BiSearch, BiSlider } from "react-icons/bi";

const AdvSearch = () => {
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
    <div className="min-h-screen p-8 max-w-7xl mx-auto pt-28">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar platillos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border rounded-lg pr-12 focus:ring-2 focus:ring-yellow-400"
          />
          <BiSearch className="absolute right-4 top-4 text-2xl text-gray-400" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BiSlider className="text-yellow-500" /> Filtros Avanzados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Rango de Precios</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>S/ 0</span>
                <span>S/ {priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Opciones Especiales</h3>
            <div className="space-y-2">
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
            <h3 className="font-semibold mb-3">Categorías</h3>
            <div className="grid grid-cols-2 gap-2">
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
            <h3 className="font-semibold mb-3">Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Resultados ({results.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((platillo) => (
            <div key={platillo.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-bold text-lg mb-2">{platillo.nombre}</h3>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-semibold">
                  S/ {platillo.precio}
                </span>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvSearch;