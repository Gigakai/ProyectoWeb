import React from "react"
import { IoMdPricetags } from "react-icons/io";
import { CiTextAlignCenter } from "react-icons/ci";
import {BiCategoryAlt, BiRename} from "react-icons/bi";

import Button from "../layouts/Button.jsx";


function ProductForm({createProductFun}) {

    return (

        <form onSubmit={createProductFun} className="min-w-xs flex flex-col gap-4">
            <h3 className="text-2xl text-center font-bold text-gray-600">Crear Producto
            </h3>
            <div className="w-full flex flex-col justify-center items-center lg:flex-row gap-2">
                <div className="lg:w-[50%] w-full flex flex-col justify-center items-center gap-4 px-8">
                    <img
                        src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/24P2OKC3RVEHRD3F2VKQ76XX7M.jpg"
                        alt="" className="w-[30em] h-[10em] object-cover rounded-xl flex justify-center items-center"/>
                    <input
                        id="productImage" type="file" accept="image/*" className="hidden"/>
                    <label htmlFor="productImage" className="text-[#F2F2F2] bg-[#f25e53] px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-center w-full cursor-pointer"> Subir Imagen</label>
                </div>
                <div className="lg:w-[50%] w-full space-y-4 px-8">
                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BiRename className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <CiTextAlignCenter className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Descripción"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <IoMdPricetags className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Precio"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>


                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BiCategoryAlt className="text-gray-500 mr-3 text-lg"/>
                        <select
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400 cursor-pointer"
                            required
                        >
                            <option value="">Categoría</option>
                            <option value="">Postres</option>
                            <option value="">Entradas</option>
                            <option value="">Bebidas</option>
                        </select>
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