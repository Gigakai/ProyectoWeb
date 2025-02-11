import React from "react";

import {BiRestaurant} from 'react-icons/bi'
import Button from "../layouts/Button";
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div>
                <div
                    className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                    <Link to="/" className="flex flex-row items-center cursor-pointer">
                    <span>
                        <BiRestaurant color="black" size={32}/>
                    </span>
                        <h1 className="text-xl font-semibold ml-2">GigaFood</h1>
                    </Link>
                    <div className="w-[2/3]">

                    </div>
                    <nav className="text-black hidden md:flex flex-row items-center text-lg font-medium gap-8">
                        <Link to="/Menu" className="hover:text-brightColor transition-all cursor-pointer">Menu</Link>
                        <Link to="/LogIn" className="hover:text-brightColor transition-all cursor-pointer">Log In</Link>
                        <Link to="/Registrar" className="hover:text-brightColor border-2 px-4 py-1 rounded-3xl transition-all cursor-pointer">Register</Link>

                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar