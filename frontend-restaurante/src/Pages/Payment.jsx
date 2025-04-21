import React, {useContext, useEffect, useState} from "react";
import ItemProduct from "../Components/ItemProduct.jsx";
import PaymentForm from "../Components/PaymentForm.jsx";
import AddressFormModal from "../Components/AddressFormModal.jsx";
import {TransContext} from "../Context/TransContext.jsx";

function Payment() {
    const [isOpenAddress, setIsOpenAddress] = useState(true);
    const {cartItems, addressRegistrada, setAddressRegistrada, setFormRegisterAddress, payOrder, total, subtotal} = useContext(TransContext)

    const openAddressModal = () => {
        setIsOpenAddress(false);
    }

    const closeAddressModal = () => {
        setIsOpenAddress(true);
    }

    useEffect(() => {
        setAddressRegistrada("")
        setFormRegisterAddress({
            calle: "",
            noCasa: "",
            colonia: "",
            municipio: "",
            estado: "",
        })
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 py-10 mt-16 gap-6">
            <AddressFormModal isOpenAddress={isOpenAddress} closeFun={closeAddressModal} />
            <div
                className="flex mx-auto hover:shadow-lg transition flex-col p-5 w-[100%] bg-[#F2F2F2] h-[400px] lg:h-[400px] shadow-sm shadow-[#00000065] gap-2">
                <h1 className="font-bold text-3xl lg:text-5xl p-2 text-[#f25e53]">Tu Carrito</h1>
                <div className="flex flex-col w-[100%] h-[250px] overflow-y-auto">
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
                <h2 className="font-bold text-lg lg:text-xl p-2 text-[#f25e53] w-full text-end">Subtotal: ${subtotal}</h2>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6">
                <PaymentForm/>
                <div
                    className="lg:w-[50%] w-[100%] hover:shadow-lg transition bg-[#F2F2F2] rounded-md shadow-sm shadow-[#00000065] p-5 flex flex-col items-center justify-between lg:gap-4">
                    <h2 className="font-bold text-xl lg:text-3xl py-1 px-2 text-[#f25e53] w-full text-start">Dirección</h2>
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-[95%]">
                <span
                    className="md:text-lg text-[#0D0D0D] overflow-hidden overflow-ellipsis whitespace-nowrap ">{addressRegistrada}
                </span>
                    </div>
                    <button
                        className="text-white bg-[#f25e53] cursor-pointer px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base w-[95%]" onClick={openAddressModal}>Cambiar
                        Dirección
                    </button>
                </div>
            </div>

            <div
                className="lg:w-[25%] w-[100%] hover:shadow-lg transition items-center gap-2 bg-[#F2F2F2] h-full rounded-md shadow-sm shadow-[#00000065] p-5 flex flex-col">
                <h2 className="font-bold text-lg lg:text-xl p-2 text-[#f25e53] w-full text-start">Total (+IVA) : ${total}</h2>
                <button onClick={payOrder}
                    className="text-white bg-[#f25e53] cursor-pointer px-6 py-2 rounded-md font-medium tracking-wider transition hover:bg-[#f25e53b3] active:bg-[#f25e53] overflow-hidden overflow-ellipsis whitespace-nowrap text-base w-[90%]">Pagar
                </button>
            </div>

        </div>
    )
        ;
}

export default Payment;
