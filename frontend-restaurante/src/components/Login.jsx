import React, { useState } from "react";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import Button from "../layouts/Button";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="text-black w-full lg:w-1/3 p-6 shadow-[rgba(0,_0,_0.24)_0px_3px_8px] rounded-lg bg-white">  
      <h3 className="font-semibold text-center text-2xl pb-4">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h3>
      <div className="space-y-4">
        {!isLogin && (
          <div className="flex items-center border border-gray-300 p-2 rounded-lg">
            <BsPersonFill className="text-gray-500 mr-2" />
            <input type="text" placeholder="Nombre" className="w-full focus:outline-none" required />
          </div>
        )}
        <div className="flex items-center border border-gray-300 p-2 rounded-lg">
          <BsPersonFill className="text-gray-500 mr-2" />
          <input type="email" placeholder="Correo Electrónico" className="w-full focus:outline-none" required />
        </div>
        <div className="flex items-center border border-gray-300 p-2 rounded-lg">
          <BsLockFill className="text-gray-500 mr-2" />
          <input type="password" placeholder="Contraseña" className="w-full focus:outline-none" required />
        </div>
        <Button title={isLogin ? "Ingresar" : "Registrarse"} />
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
  );
};

export default Login;
