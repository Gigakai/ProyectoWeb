import React, {useContext} from "react";
import { MdNumbers } from "react-icons/md";
import { MdNotListedLocation } from "react-icons/md";
import {TransContext} from "../Context/TransContext.jsx";


function AddressFormModal({isOpenAddress, closeFun}) {
    const {updateFormRegisterAddress, registerAddress, formRegisterAddress, errorsRegisterAddress} = useContext(TransContext)

    return (
        <div
            className={`top-0 left-0  w-full h-full bg-opacity-25 backdrop-blur-sm fixed justify-center items-center flex px-2 py-14 ${isOpenAddress ? "hidden" : ""}`}>
            <div className="w-[600px] bg-[#FFF] rounded-lg flex flex-col p-6">
                <div className="w-full justify-between flex flex-row items-center">
                    <h2 className="text-[#f25e53] font-semibold text-xl w-full">Dirección</h2>
                    <button className="hover:opacity-50 active:opacity-100 cursor-pointer" onClick={closeFun}>
                        <svg className=""
                             xmlns="http://www.w3.org/2000/svg" height="24" width="18"
                             viewBox="0 0 384 512">
                            <path fill="#f25e53"
                                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>

                </div>
                <form onSubmit={(e) => registerAddress(e, closeFun)}
                    className="flex items-center justify-center h-full flex-col lg:px-16 md:px-10 py-5 gap-6">
                    <h2 className="text-[#f25e53] font-semibold text-2xl w-full text-center">Ingresar tu Dirección</h2>
                    <div className="flex w-[100%] flex-col lg:flex-row gap-6">
                        <div className="w-full flex flex-col">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <MdNotListedLocation className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Calle"
                                    className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formRegisterAddress.calle}
                                    onChange={e => updateFormRegisterAddress({
                                        ...formRegisterAddress,
                                        calle: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-full flex items-center color-red-600">
                                {errorsRegisterAddress?.calle &&
                                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegisterAddress?.calle ? 'opacity-100' : 'opacity-0'}`}>Calle
                                        Invalida</p>
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <MdNumbers className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="No. Casa"
                                    className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formRegisterAddress.noCasa}
                                    onChange={e => updateFormRegisterAddress({
                                        ...formRegisterAddress,
                                        noCasa: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-full flex items-center color-red-600">
                                {errorsRegisterAddress?.noCasa &&
                                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegisterAddress?.noCasa ? 'opacity-100' : 'opacity-0'}`}>No. Casa
                                        Invalido</p>
                                }
                            </div>
                        </div>


                    </div>
                    <div className="flex w-[100%] flex-col lg:flex-row gap-6">
                        <div className="w-full flex flex-col">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <MdNotListedLocation className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Colonia"
                                    className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formRegisterAddress.colonia}
                                    onChange={e => updateFormRegisterAddress({
                                        ...formRegisterAddress,
                                        colonia: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-full flex items-center color-red-600">
                                {errorsRegisterAddress?.colonia &&
                                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegisterAddress?.colonia ? 'opacity-100' : 'opacity-0'}`}>Municipio
                                        Invalido</p>
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <MdNotListedLocation className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Municipio"
                                    className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formRegisterAddress.municipio}
                                    onChange={e => updateFormRegisterAddress({
                                        ...formRegisterAddress,
                                        municipio: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-full flex items-center color-red-600">
                                {errorsRegisterAddress?.municipio &&
                                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegisterAddress?.municipio ? 'opacity-100' : 'opacity-0'}`}>Municipio
                                        Invalido</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[100%] flex-col lg:flex-row gap-6">
                        <div className="w-full flex flex-col">
                            <div
                                className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                                <MdNotListedLocation className="text-gray-500 mr-3 text-lg"/>
                                <input
                                    type="text"
                                    placeholder="Estado"
                                    className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                                    value={formRegisterAddress.estado}
                                    onChange={e => updateFormRegisterAddress({
                                        ...formRegisterAddress,
                                        estado: e.target.value
                                    })}
                                />
                            </div>
                            <div className="w-full flex items-center color-red-600">
                                {errorsRegisterAddress?.estado &&
                                    <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsRegisterAddress?.estado ? 'opacity-100' : 'opacity-0'}`}>Estado Invalido</p>
                                }
                            </div>
                        </div>

                    </div>
                    <button
                        className="text-white bg-[#f25e53] cursor-pointer px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base w-full">Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddressFormModal