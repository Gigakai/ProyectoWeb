import React from "react"
import {BsLockFill, BsPersonFill} from "react-icons/bs";
import Button from "../layouts/Button.jsx";
import { BiRename } from "react-icons/bi";
import { CiTextAlignCenter } from "react-icons/ci";


function CategoryForm({createCategoryFun}) {
    return (
        <form onSubmit={createCategoryFun} className="min-w-xs flex flex-col gap-4">
            <h3 className="text-2xl text-center font-bold text-gray-600">Crear Categoria
            </h3>
            <div className="w-full space-y-4 px-8">
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
                        placeholder="Descrpción"
                        className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                        required
                    />
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

export default CategoryForm