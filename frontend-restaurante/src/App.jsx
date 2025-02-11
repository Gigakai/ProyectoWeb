import {useContext, useState} from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import {AuthContext} from "./Context/AuthContext.jsx";
import Landing from "./pages/Landing.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";

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
                    <Route path="/LogIn" element={ <LogIn /> } />
                    <Route path="/Registrar" element={ <Register /> } />

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
