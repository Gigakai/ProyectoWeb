import React, {useContext} from "react";
import { MdNumbers } from "react-icons/md";
import { MdNotListedLocation } from "react-icons/md";
import {BiRename} from "react-icons/bi";
import {CiTextAlignCenter} from "react-icons/ci";
import {CategoryContext} from "../Context/CategoryContext.jsx";


function CategoryModal({isOpen, closeFun}) {
    const {errorsUpdateCategory, formUpdateCategoryData, updateCategoryProgress, setFormUpdateCategoryData, updateFormUpdateCategory, updateCategory} = useContext(CategoryContext);

    return (
        <div
            className={`top-0 left-0 z-50 w-full h-full bg-opacity-25 backdrop-blur-sm fixed justify-center items-center flex px-2 py-14 ${isOpen ? "" : "hidden"}`}>
            <div className="max-w-2xl bg-[#FFF] rounded-lg flex flex-col p-6 shadow-xl">
                <div className="w-full justify-between flex flex-row items-center">
                    <h2 className="text-[#f25e53] font-semibold text-xl w-full">Categoría</h2>
                    <button className="hover:opacity-50 active:opacity-100 cursor-pointer" onClick={closeFun}>
                        <svg className=""
                             xmlns="http://www.w3.org/2000/svg" height="24" width="18"
                             viewBox="0 0 384 512">
                            <path fill="#f25e53"
                                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>

                </div>
                <form onSubmit={(e) => updateCategory(e, closeFun)}
                    className="min-w-xs flex items-center justify-center h-full flex-col lg:px-16 md:px-10 py-5 gap-6">
                    <h2 className="text-[#f25e53] font-semibold text-2xl w-full text-center">Actualizar Categoria</h2>
                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BiRename className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={formUpdateCategoryData.nombre}
                            className="w-full bg-transparent text-black focus:outline-none placeholder-gray-400"
                            onChange={e => updateFormUpdateCategory({
                                ...formUpdateCategoryData,
                                nombre: e.target.value
                            })}
                        />
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsUpdateCategory?.nombre &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsUpdateCategory?.nombre ? 'opacity-100' : 'opacity-0'}`}>Nombre
                                Invalido</p>
                        }
                    </div>

                    <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <CiTextAlignCenter className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Descrpción"
                            className="w-full bg-transparent text-black focus:outline-none placeholder-gray-400"
                            value={formUpdateCategoryData.descripcion}
                            onChange={e => updateFormUpdateCategory({
                                ...formUpdateCategoryData,
                                descripcion: e.target.value
                            })}
                        />
                    </div>
                    <div className="w-full flex items-center color-red-600">
                        {errorsUpdateCategory?.descripcion &&
                            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsUpdateCategory?.descripcion ? 'opacity-100' : 'opacity-0'}`}>Descripción
                                Invalida</p>
                        }
                    </div>
                    <button
                        disabled={updateCategoryProgress}
                        className="text-white bg-[#f25e53] cursor-pointer px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base w-full">Actualizar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal