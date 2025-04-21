import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
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
import {CategoryContextProvider} from "./Context/CategoryContext.jsx";
import {ProductContextProvider} from "./Context/ProductContext.jsx";
import {ToastContainer} from "react-toastify";
import {ReviewContextProvider} from "./Context/ReviewContext.jsx";


function App(){
    const {activeUser} = useContext(AuthContext);

    return (
        <TransContextProvider activeUser={activeUser}>
            <CategoryContextProvider>
                <ProductContextProvider>
                    <ReviewContextProvider activeUser={activeUser} >
                        <ToastContainer></ToastContainer>
                        <SideCart/>
                        <Navbar/>
                        <main>
                            <Routes>
                                {/* Rutas públicas, accesibles solo cuando no está autenticado */}
                                {!activeUser && (
                                    <>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/about" element={<About/>}/>
                                        <Route path="/menu" element={<Menu/>}/>
                                        <Route path="/reviews" element={<Reviews/>}/>
                                        <Route path="/search" element={<Search/>}/>
                                        <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a Home si se accede a una ruta no válida */}
                                    </>
                                )}


                                {/* Rutas protegidas, accesibles solo cuando está autenticado */}
                                { activeUser && (
                                    <>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/managment" element={<Managment/>}/>
                                        <Route path="/dish" element={<DishDetail/>}/>
                                        <Route path="/about" element={<About/>}/>
                                        <Route path="/menu" element={<Menu/>}/>
                                        <Route path="/reviews" element={<Reviews/>}/>
                                        <Route path="/pay" element={<Payment/>}/>
                                        <Route path="/search" element={<Search/>}/>
                                        <Route path="/profile" element={<Profile/>}/>
                                        <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a Home si se accede a una ruta no válida */}
                                    </>
                                )}

                            </Routes>
                        </main>
                        <Footer/>
                    </ReviewContextProvider>
                </ProductContextProvider>
            </CategoryContextProvider>
        </TransContextProvider>
    );
}

export default App;
