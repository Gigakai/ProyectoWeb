import React, {useContext} from "react";
import ItemProduct from "./ItemProduct.jsx";
import {TransContext} from "../Context/TransContext.jsx";
import DishCard from "./DishCard.jsx";
import {useNavigate} from "react-router-dom";
import {Bounce, toast} from "react-toastify";


function SideCart() {
    const navigate = useNavigate();

    const {isCartActive, setIsCartActive, cartItems} = useContext(TransContext)

    const closeCart = () => {setIsCartActive(false);}

    const handleBtnClick = () => {
        if(cartItems.length > 0){
            closeCart()
            navigate(`/pay`);
        }else{
            toast.info('No Tienes Productos en el carrito', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    return (
        <div className={`flex w-full h-full pr-3 bg-opacity-25 backdrop-blur-sm fixed top-0 left-0 z-52 ${ isCartActive ? "":"hidden"}`}>
            <div
                className="sidebar fixed justify-between top-0 bottom-0 p-2 w-[400px] overflow-y-auto text-center bg-[#F2F2F2] shadow-2xl shadow-[#000000]">
                <div className="w-full justify-between flex flex-row items-center p-2">
                    <h2 className="text-[#0D0D0D] font-semibold text-xl w-full text-start">Carrito</h2>
                    <button className="hover:opacity-50 active:opacity-100 cursor-pointer" onClick={closeCart}>
                        <svg className=""
                             xmlns="http://www.w3.org/2000/svg" height="24" width="18"
                             viewBox="0 0 384 512">
                            <path fill="#f25e53"
                                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>
                </div>
                <hr className="text-[#f25e53] my-2 bg-[#70a649]"/>
                <div className="h-[79%] flex flex-col overflow-y-auto items-start justify-start w-full">
                    {cartItems?.map((item) => (
                        <ItemProduct
                            key={item.id}
                            id={item.id}
                            imagen={item.imagen}
                            nombre={item.nombre}
                            cantidad={item.cantidad}
                            precio={item.precio}
                        />
                    ))}
                </div>
                <hr className="text-[#f25e53] my-2 bg-[#70a649]"/>
                <div className="flex flex-row justify-between text-lg w-full">
                    <p>Subtotal:</p>
                    <p>$</p>
                </div>
                <div className="px-5">
                    <button onClick={handleBtnClick}
                        className="text-[#F2F2F2] bg-[#f25e53] px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base w-full cursor-pointer">Continuar
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SideCart