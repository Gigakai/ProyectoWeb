import React from "react";
import Billboard from "../Components/Billboard.jsx";
import Dashboard from "../Components/Dashboard.jsx";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import Button from "../layouts/Button.jsx";
import {Link} from "react-router-dom";
import {BiCartAlt, BiCheckShield, BiTimeFive} from "react-icons/bi";

const dishes = [
    {id: 1, img: c1, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 1"},
    {id: 2, img: c2, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 2"},
    {id: 3, img: c3, title: "Tasty Dish", price: "$19.99", description: "Descripción del platillo 3"}
];

function Home() {
    return (
        <main className="">
            {/* Sección Hero */}
            <Billboard/>

            <div className="py-20 bg-gray-100">
                <div className="container mx-auto px-5 lg:px-32">
                    <h3 className="text-black text-3xl lg:text-4xl font-bold text-center mb-12">¿Por qué elegir GigaFood?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                            <BiCartAlt className="text-yellow-500 text-5xl mb-4" />
                            <h4 className="text-xl font-semibold mb-2">Variedad en el Menú</h4>
                            <p className="text-gray-600">
                                Disfruta de una amplia selección de platillos para todos los gustos y ocasiones.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                            <BiTimeFive className="text-yellow-500 text-5xl mb-4" />
                            <h4 className="text-xl font-semibold mb-2">Entrega Rápida</h4>
                            <p className="text-gray-600">
                                Nuestro servicio garantiza entregas rápidas y comida siempre fresca.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                            <BiCheckShield className="text-yellow-500 text-5xl mb-4" />
                            <h4 className="text-xl font-semibold mb-2">Calidad Garantizada</h4>
                            <p className="text-gray-600">
                                Solo utilizamos ingredientes de alta calidad para que cada bocado sea único.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="py-20 bg-yellow-400">
                <div className="container mx-auto px-5 lg:px-32 text-center">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">¡Únete a la revolución del sabor!</h3>
                    <p className="text-white text-lg lg:text-xl mb-8">
                        Explora nuestro menú y descubre el platillo perfecto para ti.
                    </p>
                    <div className="flex justify-center space-x-5">
                        <Button title="Ordenar Ahora" />
                        <Link to="/menu">
                            <Button title="Ver Menú" />
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <Dashboard details={"Nuevos Platillos"} dishes={dishes}/>
            </div>

            <div>
                <Dashboard details={"Mas Vendidos"} dishes={dishes}/>
            </div>

            <div>
                <Dashboard details={"Mejor Valorados"} dishes={dishes}/>
            </div>

        </main>
    )
        ;
}

export default Home;
