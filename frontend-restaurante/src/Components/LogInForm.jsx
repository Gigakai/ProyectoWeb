import React from "react"
import {BsLockFill, BsPersonFill} from "react-icons/bs";
import Button from "../layouts/Button.jsx";


function LogInForm({logInFun}) {
    return (

    <form onSubmit={logInFun} className="min-w-xs flex flex-col gap-4">
        <div className="w-full space-y-4 px-8">
            <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                    required
                />
            </div>

            <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                <BsLockFill className="text-gray-500 mr-3 text-lg"/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                    required
                />
            </div>
        </div>
        <div className="w-full flex justify-center">
            <Button
                title={"Ingresar"}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
            />
        </div>
    </form>
)
}

export default LogInForm