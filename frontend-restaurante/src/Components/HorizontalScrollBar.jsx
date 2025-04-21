import React, {useContext, useEffect, useRef} from "react";
import "./HorizontalScrollBar.css"
import DishAdminCard from "./DishAdminCard.jsx";
import {CategoryContext} from "../Context/CategoryContext.jsx";
import {ProductContext} from "../Context/ProductContext.jsx";

function HorizontalScrollBar() {
    const {categories} = useContext(CategoryContext);
    const {menuUpdate} = useContext(ProductContext);

    const tabMenuRef = useRef(null);
    const leftBtnRef = useRef(null);
    const rightBtnRef = useRef(null);

    const iconVisibility = () =>{
        let scrollLeftValue = Math.ceil(tabMenuRef.current.scrollLeft);

        let scrollableWidth = tabMenuRef.current.scrollWidth - tabMenuRef.current.clientWidth;

        leftBtnRef.current.style.display = scrollLeftValue > 0 ? "block" : "none";
        rightBtnRef.current.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
    }

    useEffect(() => {

        iconVisibility();
        window.addEventListener("resize", iconVisibility);
        return () => window.removeEventListener("resize", iconVisibility);
    }, []);

    const scrollLeft = () => {
        if(tabMenuRef.current && leftBtnRef.current && rightBtnRef.current) {
            tabMenuRef.current.scrollBy({ left: -150, behavior: "smooth" });
            iconVisibility();
        }
    };

    const scrollRight = () => {
        if(tabMenuRef.current && leftBtnRef.current && rightBtnRef.current) {
            tabMenuRef.current.scrollBy({ left: 150, behavior: "smooth" });
            setTimeout(()=>iconVisibility(), 50)
        }
    }

    const handleTabClick = (id, event) => {
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");
        menuUpdate(id);
    };

    return (
        <div className="tab-nav-bar">
            <div className="tab-navigation">
                <div
                    className="left-btn absolute text-[1.8em] p-[0.5em] cursor-pointer left-[0]" onClick={scrollLeft} ref={leftBtnRef}>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
                         viewBox="0 0 448 512">
                        <path fill="#70a649"
                              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                </div>

                <div
                    className="right-btn absolute text-[1.8em] p-[0.5em] cursor-pointer right-[0]" onClick={scrollRight} ref={rightBtnRef}>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
                         viewBox="0 0 448 512">
                        <path fill="#70a649"
                              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </div>
                <ul className="tab-menu" ref={tabMenuRef}>
                    {categories.map((categoria) => (
                        <li key={categoria.id} className="tab-btn" onClick={(e) => handleTabClick(categoria.id, e)}>{categoria.nombre}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HorizontalScrollBar