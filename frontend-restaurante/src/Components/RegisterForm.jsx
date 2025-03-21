import React from "react";
import {BsCalendar, BsImage, BsLockFill, BsPersonFill, BsTelephone} from "react-icons/bs";
import Button from "../layouts/Button.jsx";


function RegisterForm(registerFun) {
    return (
        <form onSubmit={registerFun} className="flex flex-col gap-5 min-w-xs">
            <div className="gap-8">
                <h4 className="text-lg font-semibold border-b-2 border-black pb-2">Información
                    Personal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsLockFill className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>
                    <div
                        className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div
                        className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsCalendar className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="date"
                            className="w-full bg-transparent focus:outline-none text-gray-400"
                            required
                        />
                    </div>

                    <div
                        className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsTelephone className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="tel"
                            placeholder="Teléfono"
                            pattern="[0-9]{10}"
                            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                        />
                    </div>

                    <div
                        className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsImage className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full bg-transparent focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center w-full">
                <Button
                    title={"Registrar"}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
                />
            </div>
        </form>

    )
}

export default RegisterForm