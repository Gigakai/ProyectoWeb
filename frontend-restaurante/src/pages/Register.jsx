import React, {useState} from "react";
import {BsPersonFill, BsLockFill} from "react-icons/bs";
import Button from "../layouts/Button";

function Register() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="grid grid-flow-col grid-rows-1 min-h-screen mt-8 justify-center items-center">
            <div className="text-black w-80 p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.3)] rounded-lg bg-white">
                <h3 className="font-semibold text-center text-2xl pb-4">
                    Registrarse
                </h3>
                <div className="space-y-4">
                    {!isLogin && (
                        <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                            <BsPersonFill className="text-gray-500 mr-2"/>
                            <input type="text" placeholder="Nombre" className="w-full focus:outline-none" required/>
                        </div>
                    )}
                    <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                        <BsPersonFill className="text-gray-500 mr-2"/>
                        <input type="email" placeholder="Correo Electrónico" className="w-full focus:outline-none"
                               required/>
                    </div>
                    <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                        <BsLockFill className="text-gray-500 mr-2"/>
                        <input type="password" placeholder="Contraseña" className="w-full focus:outline-none" required/>
                    </div>
                    <Button title={isLogin ? "Ingresar" : "Registrarse"}/>
                </div>
                <p className="mt-4 text-center text-sm">
                    {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? "Regístrate" : "Inicia sesión"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;