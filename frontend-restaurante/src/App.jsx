import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dishes from "./components/Dishes";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Login from "./components/Login";
import DishDetail from "./components/DishDetail";
import Profile from "./components/Profile";
import AdvSearch from "./components/AdvSearch";


const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dish/:id" element={<DishDetail />} />
          <Route path="/advsearch" element={<AdvSearch />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
