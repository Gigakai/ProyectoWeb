import React from "react";
import {BiCategoryAlt, BiRename} from "react-icons/bi";
import {CiTextAlignCenter} from "react-icons/ci";
import {IoMdPricetags} from "react-icons/io";
import Button from "../layouts/Button.jsx";
import { GrStatusInfo } from "react-icons/gr";


function ProductModal({isOpen, closeFun}) {
    return (
        <div
            className={`top-0 left-0 z-50 w-full h-full bg-opacity-25 backdrop-blur-sm fixed justify-center items-center flex px-2 py-14 ${isOpen ? "" : "hidden"}`}>
            <div
                className="text-black max-w-2xl p-8 space-y-6 shadow-xl rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
                <div className="w-full justify-between flex flex-row items-center">
                    <h2 className="text-[#f25e53] font-semibold text-xl w-full">Producto</h2>
                    <button className="hover:opacity-50 active:opacity-100 cursor-pointer" onClick={closeFun}>
                        <svg className=""
                             xmlns="http://www.w3.org/2000/svg" height="24" width="18"
                             viewBox="0 0 384 512">
                            <path fill="#f25e53"
                                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>

                </div>
                <form className="min-w-xs flex flex-col gap-4">
                    <h2 className="text-[#f25e53] font-semibold text-2xl w-full text-center">Actualizar Producto</h2>
                    <div className="w-full flex flex-col justify-center items-center lg:flex-row gap-2">
                        <div className="lg:w-[50%] w-full flex flex-col justify-center items-center gap-4 px-8">
                            <img
                                src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/24P2OKC3RVEHRD3F2VKQ76XX7M.jpg"
                                alt=""
                                className="w-[30em] h-[10em] object-cover rounded-xl flex justify-center items-center"/>
                            <input
                                id="productImage" type="file" accept="image/*" className="hidden"/>
                            <label htmlFor="productImage"
                                   className="text-[#F2F2F2] bg-[#f25e53] px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base text-center w-full cursor-pointer"> Subir
                                Imagen</label>
                        </div>
                        <div className="lg:w-[50%] w-full space-y-4 px-8">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <BiRename className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>

                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <CiTextAlignCenter className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Descripción"
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>

                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <IoMdPricetags className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Precio"
                                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                    required
                                />
                            </div>


                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
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

                    <div className="w-full flex justify-center gap-3">
                        <Button
                            title={"Actualizar"}
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
                        />
                        <button
                            type="button"
                            className="px-6 py-1 cursor-pointer border-2 border-brightColor text-brightColor hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all rounded-full"
                        >
                            Desactivar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductModal