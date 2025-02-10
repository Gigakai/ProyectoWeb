
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dishes from "./components/Dishes";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Login from "./components/Login";
import {useContext, useState} from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import {AuthContext} from "./Context/AuthContext.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  const {activeUser} = useContext(AuthContext)

  return (
    <>
          <Navbar/>
        <Routes>
            {/* Rutas publicas*/}
            {!activeUser ? (
                <>
                    <Route path="/" element={ <Landing /> } />

                    {/* Rutas default para cuando se ingresa una equivocada*/}
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ):(
                <Route path="/" element={<Landing />} />
            )}

            {/* Rutas Restringidas para autenticacion*/}

            {activeUser  && (
                <>
                    <Route path="/" element={ <Landing /> } />
                    {/* Rutas default para cuando se ingresa una equivocada*/}
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}


        </Routes>
<Footer/>
    </>
  )
}

export default App
