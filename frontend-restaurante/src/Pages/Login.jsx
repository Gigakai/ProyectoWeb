import React, { useState } from "react";
import { BsPersonFill, BsLockFill, BsCalendar, BsTelephone, BsPersonCheck, BsImage } from "react-icons/bs";
import Button from "../layouts/Button.jsx";
import LogInForm from "../Components/LogInForm.jsx";
import RegisterForm from "../Components/RegisterForm.jsx";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-30 p-12">
          <div
              className="text-black max-w-2xl p-8 space-y-6 shadow-xl rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
              <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2 text-black">GigaFood</h1>
                  <h3 className="text-xl font-medium text-gray-600">
                      {isLogin ? "Bienvenido" : "Registro de nuevo usuario"}
                  </h3>
              </div>

              {
                  isLogin ?
                      <>
                          <LogInForm/>
                      </> :
                      <>
                          <RegisterForm/>
                      </>
              }

              <p className="text-center text-gray-600">
                  {isLogin ? "¿Primera vez aquí? " : "¿Ya tienes cuenta? "}
                  <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-black font-semibold underline hover:no-underline transition-all duration-300 cursor-pointer"
                  >
                      {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                  </button>
              </p>
          </div>
      </div>
  );
};

export default Login;
