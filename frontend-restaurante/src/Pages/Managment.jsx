import React, {useContext, useState} from "react";
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
import {AuthContext} from "../Context/AuthContext.jsx";
import {CategoryContext} from "../Context/CategoryContext.jsx";
import {ProductContext} from "../Context/ProductContext.jsx";


const Managment = () => {
    const {activeUser} = useContext(AuthContext);
    const {categories, setFormUpdateCategoryData} = useContext(CategoryContext);
    const {products, setFormUpdateProductData, setImageSrcUpd} = useContext(ProductContext);
    const [page, setPage] = useState(1);
    const [statusCategoryModal, setStatusCategoryModal] = useState(false);
    const [statusProductModal, setStatusProductModal] = useState(false);

    const closeProductModal = () => {
        setStatusProductModal(false);
        setFormUpdateProductData({
            idPlatillo: "",
            nombre: "",
            descripcion: "",
            precio: "",
            categoria: "",
            imagen: null,
            imagenAnterior: ""
        })
        setImageSrcUpd("")
    }

    const openProductModal = (attributes) => {
        setStatusProductModal(true);
        setImageSrcUpd(attributes.imagen)
        setFormUpdateProductData({
            idPlatillo: attributes.id,
            nombre: attributes.nombre,
            descripcion: attributes.descripcion,
            precio: attributes.precio,
            categoria: attributes.Categoria[0].id,
            imagen: null,
            imagenAnterior: attributes.imagen});
    }

    const closeCategoryModal = () => {
        setStatusCategoryModal(false);
        setFormUpdateCategoryData({idCategoria: "", nombre: "", descripcion: ""});
    }

    const openCategoryModal = (id, nombre, descripcion) => {
        setStatusCategoryModal(true);
        setFormUpdateCategoryData({idCategoria: id, nombre: nombre, descripcion: descripcion});
    }

    const dishes = [
        {id: 1, img: c1, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 1", categoria: "Postres"},
        {id: 2, img: c2, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 2", categoria: "Postres"},
        {id: 3, img: c3, title: "Tasty Dish", price: "$19.99", description: "Descripción del platillo 3", categoria: "Postres"},
        {id: 4, img: c4, title: "Tasty Dish", price: "$11.99", description: "Descripción del platillo 4", categoria: "Postres"},
        {id: 5, img: c5, title: "Tasty Dish", price: "$10.99", description: "Descripción del platillo 5", categoria: "Postres"},
        {id: 6, img: c6, title: "Tasty Dish", price: "$12.99", description: "Descripción del platillo 6", categoria: "Postres"},
    ];

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
                                - Autorizado</h2>
                            <h1 className="font-semibold text-lg md:text-4xl text-start w-[100%]">{activeUser.nombre}</h1>
                        </div>
                    </div>
                    <div className="w-[30%] h-full flex flex-col justify-end items-end">

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
                    {products?.map((dish) => (
                        <DishAdminCard
                            key={dish.id}
                            id={dish.id}
                            imagen={dish.imagen}
                            nombre={dish.nombre}
                            precio={dish.precio}
                            descripcion={dish.descripcion}
                            Categoria={dish.Categoria}
                            openModal={openProductModal}
                        />
                    ))}
                </div>
            }

            {(page === 3) &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full items-stretch">
                    {categories?.map((categoria) => (
                        <CategoryCard
                            key={categoria.id}
                            id={categoria.id}
                            nombre={categoria.nombre}
                            descripcion={categoria.descripcion}
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
