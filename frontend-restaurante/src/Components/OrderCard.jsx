import React, {useEffect, useState} from "react";
import './DishCard.css'
import moment from "moment/moment.js";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

function OrderCard(props){
    const IVA = 0.16;
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        if (props?.Platillos?.length > 0) {
            const subtotal = props.Platillos.reduce((acc, item) => {
                return acc + item.precioUnitario * item.cantidad;
            }, 0);
            const totalConIva = subtotal + (subtotal * IVA);
            setTotal(totalConIva);
        }
    }, [props?.Platillos]);

    return (
        <div className="border rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
                {props?.Platillos.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                            <p className="font-semibold">{item.Platillo.nombre}</p>
                            <p className="text-sm text-gray-500">
                                Cantidad: {item.cantidad}
                            </p>
                        </div>
                        <p className="text-gray-600">
                            $ {(item.precioUnitario * item.cantidad).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-600 font-semibold">
                        Fecha: {moment(props?.createdAt).calendar()}
                    </p>
                    <p className="text-gray-600 font-bold">
                        Dirección: <span className="text-[#f25e53] font-semibold">{props?.direccion}</span>
                    </p>
                    <p className="text-gray-600 font-bold">
                        Metodo de Pago: <span className="text-[#f25e53] font-semibold">**** **** **** {props?.metodo.ultimosDigitos}</span>
                    </p>
                </div>
                <p className="text-xl font-bold text-[#f25e53]">
                    Total: ${total?.toFixed(2)}
                </p>
            </div>
        </div>

    );
};

export default OrderCard;