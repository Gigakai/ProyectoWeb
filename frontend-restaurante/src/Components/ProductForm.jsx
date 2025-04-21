import React, {useContext, useEffect, useRef, useState} from "react"
import { IoMdPricetags } from "react-icons/io";
import { CiTextAlignCenter } from "react-icons/ci";
import {BiCategoryAlt, BiRename} from "react-icons/bi";
import Button from "../layouts/Button.jsx";
import {CategoryContext} from "../Context/CategoryContext.jsx";
import CategoryCard from "./CategoryCard.jsx";
import {ProductContext} from "../Context/ProductContext.jsx";


function ProductForm({createProductFun}) {
    const {updateFormCreateProduct, formCreateProductData, createProduct, errorsCreateProduct, setFormCreateProductData, imageSrc, setImageSrc} = useContext(ProductContext);
    const {categories} = useContext(CategoryContext);

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
            // Actualiza el formulario con el archivo seleccionado
            updateFormCreateProduct({ ...formCreateProductData, imagen: file });
        }
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    useEffect(() => {
        setFormCreateProductData({nombre:"", descripcion:"", precio: "", categoria: "", imagen: null});
        setImageSrc('')
    }, []);

    return (
        <form onSubmit={createProduct} className="min-w-xs flex flex-col gap-4">
            <h3 className="text-2xl text-center font-bold text-gray-600">Crear Producto
            </h3>
            <div className="w-full flex flex-col justify-center items-center lg:flex-row gap-2">
                <div className="lg:w-[50%] w-full flex flex-col justify-center items-center gap-4 px-8">
                    <img
                        src={imageSrc}
                        alt="" className="w-[30em] h-[10em] object-cover rounded-xl flex justify-center items-center"/>
                    <div className="w-full flex items-center color-red-600">
                        {errorsCreateProduct?.imagen &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsCreateProduct?.imagen ? 'opacity-100' : 'opacity-0'}`}>No se ingreso una imagen</p>
                        }
                    </div>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef}
                           onChange={handleFileChange}/>
                    <button onClick={handleButtonClick} role="button"
                            className="text-[#F2F2F2] bg-[#f25e53] px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-center w-full cursor-pointer">Subir
                        Imagen
                    </button>
                </div>
                <div className="lg:w-[50%] w-full space-y-4 px-8">
                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BiRename className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={formCreateProductData.nombre}
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            onChange={e => updateFormCreateProduct({...formCreateProductData, nombre: e.target.value})}
                        />
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsCreateProduct?.nombre &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsCreateProduct?.nombre ? 'opacity-100' : 'opacity-0'}`}>Nombre
                                Invalida</p>
                        }
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <CiTextAlignCenter className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={formCreateProductData.descripcion}
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            onChange={e => updateFormCreateProduct({
                                ...formCreateProductData,
                                descripcion: e.target.value
                            })}
                        />
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsCreateProduct?.descripcion &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsCreateProduct?.descripcion ? 'opacity-100' : 'opacity-0'}`}>Descripción
                                Invalida</p>
                        }
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <IoMdPricetags className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Precio"
                            value={formCreateProductData.precio}
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            onChange={e => updateFormCreateProduct({...formCreateProductData, precio: e.target.value})}
                        />
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsCreateProduct?.precio &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsCreateProduct?.precio ? 'opacity-100' : 'opacity-0'}`}>Precio
                                Invalido</p>
                        }
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BiCategoryAlt className="text-gray-500 mr-3 text-lg"/>
                        <select
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400 cursor-pointer"
                            onChange={e => updateFormCreateProduct({
                                ...formCreateProductData,
                                categoria: e.target.value
                            })}
                            value={formCreateProductData.categoria}
                        >
                            <option value="0">Categoría</option>
                            {categories.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsCreateProduct?.categoria &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsCreateProduct?.categoria ? 'opacity-100' : 'opacity-0'}`}>No selecciono una categoria</p>
                        }
                    </div>

                </div>
            </div>

            <div className="w-full flex justify-center">
                <Button
                    title={"Crear"}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
                />
            </div>
        </form>
    )
}

export default ProductForm