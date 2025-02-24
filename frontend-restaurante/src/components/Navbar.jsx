import React from "react";
import { Link } from "react-router-dom"; 
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <span>
              <BiRestaurant color="black" size={32} />
            </span>
            <h1 className="text-xl font-semibold ml-2">GigaFood</h1>
          </div>
          <nav className="text-black hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="/" className="hover:text-brightColor transition-all cursor-pointer">
              Home
            </Link>
            <div className="relative group">
              <div className="flex items-center gap-1">
                <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
                  Dishes
                </Link>
              </div>
              <ul className="absolute hidden space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5">
                <li>
                  <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
                    Spicy
                  </Link>
                </li>
                <li>
                  <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
                    Tasty
                  </Link>
                </li>
                <li>
                  <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
                    Delicious
                  </Link>
                </li>
                <li>
                  <Link to="/dishes" className="hover:text-brightColor transition-all cursor-pointer">
                    Crispy
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/about" className="hover:text-brightColor transition-all cursor-pointer">
              About
            </Link>
            <Link to="/menu" className="hover:text-brightColor transition-all cursor-pointer">
              Menu
            </Link>
            <Link to="/review" className="hover:text-brightColor transition-all cursor-pointer">
              Reviews
            </Link>

            <Link to="/login">
              <Button title="Iniciar Sesión" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
