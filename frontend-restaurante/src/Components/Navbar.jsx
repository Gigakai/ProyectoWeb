import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {BiRestaurant, BiSearch, BiSlider} from "react-icons/bi";
import Button from "../layouts/Button.jsx";
import {TransContext} from "../Context/TransContext.jsx";
import {FaFilter} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import {AuthContext} from "../Context/AuthContext.jsx";
import {ProductContext} from "../Context/ProductContext.jsx";

const Navbar = () => {
    const {activeUser, logOutUser} = useContext(AuthContext);
    const {searchNavBar, formSearchBasic, updateFormSearchBasic} = useContext(ProductContext);
    const {setIsCartActive} = useContext(TransContext);

    const openCart = () => {
        setIsCartActive(true);
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div
                className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
                <div className="w-[40%] flex flex-row items-center gap-2">
                    <span>
                        <BiRestaurant color="black" size={32}/>
                    </span>
                    <h1 className="text-xl font-semibold ml-2">GigaFood</h1>
                    <form onSubmit={searchNavBar} className="flex flex row items-center w-full justify-center gap-4 w-full">
                        <div className="w-full text-black relative flex flex-row">
                            <input
                                value={formSearchBasic.searchText}
                                onChange={e => updateFormSearchBasic({...formSearchBasic, searchText: e.target.value})}
                                className="form-control w-full text-black border-2 rounded-full outline-hidden border-black px-2 py-1"
                                type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                    </form>
                </div>

                <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                    <Link to="/" className="hover:text-brightColor transition-all cursor-pointer">
                        Home
                    </Link>

                    <Link to="/about" className="hover:text-brightColor transition-all cursor-pointer">
                        About
                    </Link>
                    <Link to="/menu" className="hover:text-brightColor transition-all cursor-pointer">
                        Menu
                    </Link>

                    {activeUser && (
                        <>
                            {
                                (activeUser?.rol === "C") ? (
                                    <>
                                        <Link to="/profile" className="hover:text-brightColor transition-all cursor-pointer">
                                            Profile
                                        </Link>
                                        <button
                                            className=" items-center flex flex-row hover:opacity-50 active:opacity-100 cursor-pointer"
                                            onClick={openCart}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-1"
                                                viewBox="0 0 576 512">
                                                <path fill="#000000"
                                                      d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/managment" className="hover:text-brightColor transition-all cursor-pointer">
                                            Managment
                                        </Link>
                                    </>
                                )
                            }


                            <button onClick={logOutUser}
                                className="px-6 py-1 cursor-pointer border-2 border-black text-black hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all rounded-full ">
                                Log Out
                            </button>
                        </>
                    )}

                    {!activeUser && (
                        <Link to="/login">
                            <Button title="Iniciar Sesión"/>
                        </Link>
                    )}
                </nav>

            </div>
        </div>
    );
};

export default Navbar;
