import React, {useContext, useEffect, useState} from "react";
import {BiUserCircle, BiEdit} from "react-icons/bi";
import {AuthContext} from "../Context/AuthContext.jsx";
import {TransContext} from "../Context/TransContext.jsx";
import OrderCard from "../Components/OrderCard.jsx";

function Profile() {
    const {
        activeUser,
        formUpdateData,
        updateFormUpdate,
        updateUserFun,
        errorsUpdateUser,
        updateProgress,
        setFormUpdateData
    } = useContext(AuthContext);

    const {orders} = useContext(TransContext);

    useEffect(() => {
        setFormUpdateData({
            nombre: activeUser?.nombre || '',
            telefono: activeUser?.telefono || '',
            password: activeUser?.password || ''
        });


    }, []);

    const [pedidos] = useState([
        {
            id: 1,
            fecha: "15 Marzo 2024",
            items: [
                {nombre: "Platillo 1", precio: 25.99, cantidad: 2},
                {nombre: "Platillo 2", precio: 18.50, cantidad: 1}
            ],
            total: 70.48,
            estado: "Entregado"
        },
        {
            id: 2,
            fecha: "10 Marzo 2024",
            items: [
                {nombre: "Platillo 3", precio: 22.00, cantidad: 3}
            ],
            total: 66.00,
            estado: "Entregado"
        }
    ]);


    return (
        <div className="text-black min-h-screen p-8 max-w-7xl mx-auto pt-28">
            <form onSubmit={updateUserFun} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            {activeUser?.avatar ? (
                                <img
                                    src={activeUser?.avatar}
                                    alt="Avatar"
                                    className="w-[5em] h-[5em] rounded-full object-cover"
                                />
                            ) : (
                                <BiUserCircle className="text-5xl text-gray-400"/>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {activeUser?.nombre}
                        </h1>
                    </div>
                    <button
                        disabled={updateProgress}
                        className="bg-[#f25e53] cursor-pointer hover:bg-[#f25e53b3] active:bg-[#f25e53] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <BiEdit className="text-xl"/> Editar Perfil
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formUpdateData.nombre}
                            onChange={e => updateFormUpdate({...formUpdateData, nombre: e.target.value})}
                            className={`w-full p-3 border rounded-lg`}
                        />
                        <div className="w-full flex items-center color-red-600">
                            {errorsUpdateUser?.nombre &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsUpdateUser?.nombre ? 'opacity-100' : 'opacity-0'}`}>Nombre
                                    Invalido</p>
                            }
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formUpdateData.telefono}
                            onChange={e => updateFormUpdate({...formUpdateData, telefono: e.target.value})}
                            className={`w-full p-3 border rounded-lg`}
                        />
                        <div className="w-full flex items-center color-red-600">
                            {errorsUpdateUser?.telefono &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsUpdateUser?.telefono ? 'opacity-100' : 'opacity-0'}`}>Telefono
                                    Invalido</p>
                            }
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={activeUser?.email}
                            className={`w-full p-3 border rounded-lg bg-gray-100`}
                            disabled={true}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formUpdateData.password}
                            onChange={e => updateFormUpdate({...formUpdateData, password: e.target.value})}
                            className={`w-full p-3 border rounded-lg`}
                        />
                        <div className="w-full flex items-center color-red-600">
                            {errorsUpdateUser?.password &&
                                <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ease-in ${errorsUpdateUser?.password ? 'opacity-100' : 'opacity-0'}`}>Contraseña
                                    Invalida</p>
                            }
                        </div>
                    </div>
                </div>
            </form>

            {/* HISTORIAL PEDIDOS */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Historial de Pedidos</h2>

                <div className="space-y-6">
                    {orders?.map((order) => (
                        <OrderCard
                            id={order.id}
                            metodo={order.Metodo}
                            key={order.id}
                            Platillos={order.PlatillosPedidos}
                            direccion={order.direccion}
                            createdAt={order.createdAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
