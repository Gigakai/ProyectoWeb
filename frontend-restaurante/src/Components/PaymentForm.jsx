import React from "react";
import {BsLockFill, BsPersonFill} from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";


function PaymentForm() {
    return (
        <form
            className="flex mx-auto flex-col p-5 w-[100%] lg:w-[50%] bg-[#F2F2F2] shadow-sm shadow-[#00000065] justify-between hover:shadow-lg transition">
            <h2 className="font-bold text-xl lg:text-3xl p-2 text-[#F22929]">Metodo de Pago</h2>
            <div className="flex w-[100%] flex-col gap-2">
                <div className="flex w-[100%] flex-col lg:flex-row gap-2">
                    <div
                        className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <FaCreditCard className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Numero de Tarjeta"
                            className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div
                        className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsLockFill className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="password"
                            placeholder="CSV"
                            className="text-black w-full bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>
                </div>
                <div className="flex w-[100%] flex-col lg:flex-row gap-2">
                    <div
                        className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <BsPersonFill className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>

                    <div
                        className="w-full flex items-center border-b-2 border-gray-300 py-2 focus-within:border-black">
                        <FaCalendar className="text-gray-500 mr-3 text-lg"/>
                        <input
                            type="text"
                            placeholder="Fecha de Vencimiento"
                            className="w-full text-black bg-transparent focus:outline-none placeholder-gray-400"
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PaymentForm