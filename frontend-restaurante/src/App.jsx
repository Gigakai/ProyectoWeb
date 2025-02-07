import {useContext, useState} from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import {AuthContext} from "./Context/AuthContext.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  const {activeUser} = useContext(AuthContext)

  return (
    <>
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
    </>
  )
}

export default App
