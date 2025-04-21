import React, {useContext, useEffect, useState} from "react";
import {BsCalendar, BsImage, BsLockFill, BsPersonFill, BsTelephone} from "react-icons/bs";
import Button from "../layouts/Button.jsx";
import {AuthContext} from "../Context/AuthContext.jsx";


function RegisterForm(registerFun) {
    const {signInUser, formRegisterData, updateFormRegister, errorsRegister, registerProgress, setFormRegisterData} = useContext(AuthContext);
    const [imageSrc, setImageSrc] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
            // Actualiza el formulario con el archivo seleccionado
            updateFormRegister({ ...formRegisterData, avatar: file });
        }
    };

    useEffect(() => {
        setFormRegisterData({email:"", password:"", nombre: "", fechaNacimiento: "", telefono: "", avatar: null})
    }, []);

    return (
        <form onSubmit={signInUser} className="flex flex-col gap-5 min-w-xs">
            <div className="gap-8">
                <h4 className="text-lg font-semibold border-b-2 border-black pb-2">Información
                    Personal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="text"
                                placeholder="Correo electrónico"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                onChange={e => updateFormRegister({...formRegisterData, email: e.target.value})}
                            />
                        </div>
                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.email &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.email ? 'opacity-100' : 'opacity-0'}`}>Email Invalido o en Uso</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsLockFill className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                onChange={e => updateFormRegister({...formRegisterData, password: e.target.value})}
                            />
                        </div>

                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.password &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.password ? 'opacity-100' : 'opacity-0'}`}>Contraseña Invalida</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                onChange={e => updateFormRegister({...formRegisterData, nombre: e.target.value})}
                            />
                        </div>
                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.nombre &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.nombre ? 'opacity-100' : 'opacity-0'}`}>Nombre Invalido</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsCalendar className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="date"
                                className="w-full bg-transparent focus:outline-none text-gray-400"
                                onChange={e => updateFormRegister({
                                    ...formRegisterData,
                                    fechaNacimiento: e.target.value
                                })}
                            />
                        </div>

                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.fechaNacimiento &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.fechaNacimiento ? 'opacity-100' : 'opacity-0'}`}>Fecha Nacimiento Invalida</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsTelephone className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="tel"
                                placeholder="Teléfono"
                                className="w-full bg-transparent focus:outline-none placeholder-gray-400"
                                onChange={e => updateFormRegister({...formRegisterData, telefono: e.target.value})}
                            />
                        </div>

                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.telefono &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.telefono ? 'opacity-100' : 'opacity-0'}`}>Telefono Invalido</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black w-full">
                            <BsImage className="text-gray-500 mr-3 text-lg"/>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full bg-transparent focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-colors"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="w-full flex items-center color-red-600">
                            {errorsRegister?.avatar &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegister?.avatar ? 'opacity-100' : 'opacity-0'}`}>Avatar Invalido</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center w-full">
                <Button
                    disabled={registerProgress}
                    title={"Registrar"}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 max-w-xs"
                />
            </div>
        </form>

    )
}

export default RegisterForm