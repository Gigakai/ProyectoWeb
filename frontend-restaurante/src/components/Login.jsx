import React, { useState } from "react";
import { BsPersonFill, BsLockFill, BsCalendar, BsTelephone, BsPersonCheck, BsImage } from "react-icons/bs";
import Button from "../layouts/Button";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-30 p-4"> 
  <div className="text-black w-full max-w-2xl p-8 space-y-6 shadow-xl rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-black">GigaFood</h1>
          <h3 className="text-xl font-medium text-gray-600">
            {isLogin ? "Bienvenido" : "Registro de nuevo usuario"}
          </h3>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b-2 border-black pb-2">Información Personal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsPersonFill className="text-gray-500 mr-3 text-lg" />
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsCalendar className="text-gray-500 mr-3 text-lg" />
                    <input
                      type="date"
                      className="w-full bg-transparent focus:outline-none text-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsTelephone className="text-gray-500 mr-3 text-lg" />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      pattern="[0-9]{10}"
                      className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsImage className="text-gray-500 mr-3 text-lg" />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full bg-transparent focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b-2 border-black pb-2">Información de la Cuenta</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsPersonCheck className="text-gray-500 mr-3 text-lg" />
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                    <BsPersonFill className="text-gray-500 mr-3 text-lg" />
                    <select
                      className="w-full bg-transparent focus:outline-none text-gray-700"
                      required
                    >
                      <option value="usuario">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
              <BsPersonFill className="text-gray-500 mr-3 text-lg" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                required
              />
            </div>
            
            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
              <BsLockFill className="text-gray-500 mr-3 text-lg" />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              title={isLogin ? "Ingresar" : "Completar Registro"}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
            />
          </div>
        </form>

        <p className="text-center text-gray-600">
          {isLogin ? "¿Primera vez aquí? " : "¿Ya tienes cuenta? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-black font-semibold underline hover:no-underline transition-all duration-300"
          >
            {isLogin ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;