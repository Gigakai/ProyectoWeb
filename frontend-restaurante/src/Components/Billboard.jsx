import React from "react"

import { Link } from "react-scroll";
import {BiRestaurant} from 'react-icons/bi'
import Button from "../layouts/Button";


function Billboard(){
    return(
        <div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/comida3.jpg')] bg-cover bg-no-repeat">
            <div className="w-full lg:w-2/3 space-y-5">
                <h2 className="text-7xl font-semibold text-white">Bienvenido Gracias por Elegirnos </h2>
                <p className="text-2xl text-white">
                    Bienvenido a GigaFood: donde cada bocado es una explosión de sabor.
                    🌶️🔥 Desde lo más picante hasta lo más delicioso, aquí encontrarás
                    platillos irresistibles que llevarán tu paladar al siguiente nivel.
                    ¡Atrévete a probarlo y vive la experiencia GigaFood! 🍔🍗🍕"
                </p>
                <div className="lg:pl-44">
                    <Button title="Ordenar Ahora"/>
                </div>
            </div>
        </div>
    )
}

export default Billboard