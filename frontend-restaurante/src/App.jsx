import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Dishes from "./Pages/Dishes.jsx";
import About from "./Pages/About.jsx";
import Menu from "./Pages/Menu.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Pages/Login.jsx";
import Reviews from "./Pages/Reviews.jsx";
import DishDetail from "./Pages/DishDetail.jsx";
import SideCart from "./Components/SideCart.jsx";
import {TransContextProvider} from "./Context/TransContext.jsx";
import {AuthContext} from "./Context/AuthContext.jsx";
import Payment from "./Pages/Payment.jsx";
import Managment from "./Pages/Managment.jsx";
import Search from "./Pages/Search.jsx";
import Profile from "./Pages/Profile.jsx";


function App(){
    const {activeUser} = useContext(AuthContext);

    return (
        <TransContextProvider>
            <SideCart/>
            <Navbar/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dishes" element={<Dishes/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/reviews" element={<Reviews/>}/>
                    <Route path="/dish/:id" element={<DishDetail/>}/>
                    <Route path="/pay" element={<Payment/>}/>
                    <Route path="/managment" element={<Managment/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/profile" element={<Profile/>}/>

                    {/* Rutas públicas, accesibles solo cuando no está autenticado */}
                    {!activeUser ? (
                        <>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a Home si se accede a una ruta no válida */}
                        </>
                    ) : (
                        <Route path="/" element={<Home/>}/>
                    )}


                    {/* Rutas protegidas, accesibles solo cuando está autenticado */}
                    { activeUser && (
                        <>
                            <Route path="/dish/:id" element={<DishDetail/>}/>
                            <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a Home si se accede a una ruta no válida */}
                        </>
                    )}

                </Routes>
            </main>
            <Footer/>
        </TransContextProvider>
    );
}

export default App;
