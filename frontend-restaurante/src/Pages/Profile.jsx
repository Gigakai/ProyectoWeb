import React, {useState} from "react";
import {BiUserCircle, BiEdit} from "react-icons/bi";

function Profile() {
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        nombre: "Gustavo Gomez",
        telefono: "+52 768 110 6299",
        email: "Gus.Gomez@gmail.com",
        password: "********",
        avatar: ".././assets/comida3.jpg"
    });

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

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className="text-black min-h-screen p-8 max-w-7xl mx-auto pt-28">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            {userData.avatar ? (
                                <img
                                    src={userData.avatar}
                                    alt="Avatar"
                                    className="w-[20em] h-[20em] rounded-full object-cover"
                                />
                            ) : (
                                <BiUserCircle className="text-5xl text-gray-400"/>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {userData.nombre}
                        </h1>
                    </div>
                    <button
                        onClick={() => setEditing(!editing)}
                        className="bg-[#f25e53] hover:bg-[#f25e53b3] active:bg-[#f25e53] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <BiEdit className="text-xl"/> {editing ? "Guardar Cambios" : "Editar Perfil"}
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
                            value={userData.nombre}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${!editing && "bg-gray-100"}`}
                            disabled={!editing}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={userData.telefono}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${!editing && "bg-gray-100"}`}
                            disabled={!editing}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${!editing && "bg-gray-100"}`}
                            disabled={!editing}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-lg ${!editing && "bg-gray-100"}`}
                            disabled={!editing}
                        />
                    </div>
                </div>
            </div>

            {/* HISTORIAL PEDIDOS */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Historial de Pedidos</h2>

                <div className="space-y-6">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="border rounded-lg p-6 shadow-sm">
                            <div className="space-y-4">
                                {pedido.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-2">
                                        <div>
                                            <p className="font-semibold">{item.nombre}</p>
                                            <p className="text-sm text-gray-500">
                                                Cantidad: {item.cantidad}
                                            </p>
                                        </div>
                                        <p className="text-gray-600">
                                            $ {(item.precio * item.cantidad).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-600 font-semibold">
                                        Fecha: {pedido.fecha}
                                    </p>
                                    <p className="text-gray-600 font-bold">
                                        Estado: <span className="text-[#f25e53] font-semibold">{pedido.estado}</span>
                                    </p>
                                </div>
                                <p className="text-xl font-bold text-[#f25e53]">
                                    Total: $ {pedido.total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
