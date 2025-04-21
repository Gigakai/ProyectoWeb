import React, {useContext, useEffect} from "react"
import {BsLockFill, BsPersonFill} from "react-icons/bs";
import Button from "../layouts/Button.jsx";
import {AuthContext} from "../Context/AuthContext.jsx";


function LogInForm({logInFun}) {
    const {formLogInData, updateFormLogIn, errorsLogIn, logInUser, logInProgress, setFormLogInData} = useContext(AuthContext);

    useEffect(() => {
        setFormLogInData({email:"", password:""})
    }, []);

    return (
     <form onSubmit={logInUser} className="min-w-xs flex flex-col gap-4">
        <div className="w-full space-y-4 px-8">
            <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                <input
                    type="text"
                    placeholder="Correo electrónico"
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                    onChange={e => updateFormLogIn({...formLogInData, email: e.target.value})}
                />
            </div>
            <div className="w-full flex items-center color-red-600">
                {errorsLogIn?.email &&
                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsLogIn?.email ? 'opacity-100' : 'opacity-0'}`}>No existe este email</p>
                }
            </div>

            <div className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
            <BsLockFill className="text-gray-500 mr-3 text-lg"/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                    onChange={e => updateFormLogIn({...formLogInData, password: e.target.value})}
                />
            </div>
            <div className="w-full flex items-center color-red-600">
                {errorsLogIn?.password &&
                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsLogIn?.password ? 'opacity-100' : 'opacity-0'}`}>Contraseña Incorrecta</p>
                }
            </div>
        </div>
        <div className="w-full flex justify-center">
            <Button
                disabled={logInProgress}
                title={"Ingresar"}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
            />
        </div>
    </form>
)
}

export default LogInForm