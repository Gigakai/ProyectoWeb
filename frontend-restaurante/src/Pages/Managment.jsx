import React, {useState} from "react";
import {RiAdminFill} from "react-icons/ri";
import TypeSelector from "../Components/TypeSelector.jsx";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";
import CategoryForm from "../Components/CategoryForm.jsx";
import ProductForm from "../Components/ProductForm.jsx";
import DishAdminCard from "../Components/DishAdminCard.jsx";
import CategoryCard from "../Components/CategoryCard.jsx";
import ProductModal from "../Components/ProductModal.jsx";
import CategoryModal from "../Components/CategoryModal.jsx";


const Managment = () => {
    const [page, setPage] = useState(1);
    const [statusCategoryModal, setStatusCategoryModal] = useState(false);
    const [statusProductModal, setStatusProductModal] = useState(false);

    const closeProductModal = () => {
        setStatusProductModal(false);
    }

    const openProductModal = () => {
        setStatusProductModal(true);
    }

    const closeCategoryModal = () => {
        setStatusCategoryModal(false);
    }

    const openCategoryModal = () => {
        setStatusCategoryModal(true);
    }

    const dishes = [
        {id: 1, img: c1, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 1", categoria: "Postres"},
        {id: 2, img: c2, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 2", categoria: "Postres"},
        {id: 3, img: c3, title: "Tasty Dish", price: "$19.99", description: "Descripción del platillo 3", categoria: "Postres"},
        {id: 4, img: c4, title: "Tasty Dish", price: "$11.99", description: "Descripción del platillo 4", categoria: "Postres"},
        {id: 5, img: c5, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 5", categoria: "Postres"},
        {id: 6, img: c6, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 6", categoria: "Postres"},
    ];

    const categorias = [
        {id: 1, nombre: "Postres", descripcion: "Platillos dulces tras terminar de comer", numProductos: 3},
        {id: 2, nombre: "Entradas", descripcion: "Platillos servidos como entradas", numProductos: 2},
        {id: 3, nombre: "Bebidas", descripcion: "Bebidas ofrecidas en nuestro local", numProductos: 4},
        {id: 4, nombre: "Hamburguesas", descripcion: "Serie de productos relacionados con la hamburguesa", numProductos: 5},
    ]

    return (
        <div className="min-h-screen flex flex-col justify-start items-center lg:px-32 px-5 bg-gray-50 pt-30 gap-6">

            <ProductModal closeFun={closeProductModal} isOpen={statusProductModal}/>
            <CategoryModal closeFun={closeCategoryModal} isOpen={statusCategoryModal}/>

            <div className="w-full flex flex-col justify-center items-center my-4 p-4 gap-6">
                <div className="w-full flex flex-row justify-between items-center p-4 gap-6">
                    <div className="w-[70%] flex flex-row justify-start items-center gap-6">
                        <RiAdminFill className="text-gray-500 text-5xl md:text-7xl"/>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-base md:text-xl text-start w-[100%] text-black">Administrador
                                - Hombre</h2>
                            <h1 className="font-semibold text-lg md:text-4xl text-start w-[100%]">Gustavo Gomez</h1>
                        </div>
                    </div>
                    <div className="w-[30%] h-full flex flex-col justify-end items-end">
                        <button
                            className="px-2 md:px-6 py-1 border-2 border-black text-black hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all rounded-full cursor-pointer">Log
                            Out
                        </button>
                    </div>
                </div>
                <hr className="w-full text-[#000000] bg-[#000000] w-[90%] shadow-lg shadow-[#000000]"/>
            </div>
            <h1 className="font-semibold text-4xl text-center w-[100%]">Gestión de Información</h1>
            <section className="relative m-[0 80px] w-full">
                <TypeSelector setPage={setPage}/>
            </section>


            {(page === 1) &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dishes.map((dish) => (
                        <DishAdminCard
                            key={dish.id}
                            id={dish.id}
                            img={dish.img}
                            title={dish.title}
                            price={dish.price}
                            description={dish.description}
                            categoria={dish.categoria}
                            openModal={openProductModal}
                        />
                    ))}
                </div>
            }

            {(page === 3) &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorias.map((categoria) => (
                        <CategoryCard
                            key={categoria.id}
                            id={categoria.id}
                            name={categoria.nombre}
                            numProducts={categoria.numProductos}
                            description={categoria.descripcion}
                            openModal={openCategoryModal}
                        />
                    ))}
                </div>
            }

            {(page === 4) &&
                <div
                    className="text-black max-w-2xl p-8 space-y-6 shadow-xl rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
                    <CategoryForm/>
                </div>
            }

            {(page === 2) &&
                <div
                    className="text-black max-w-2xl p-8 space-y-6 shadow-xl rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
                    <ProductForm/>
                </div>
            }


        </div>
    );
};

export default Managment;
