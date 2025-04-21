import React, {useContext, useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    AiOutlinePlus,
    AiOutlineMinus,
} from "react-icons/ai";
import {BiSend} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {ProductContext} from "../Context/ProductContext.jsx";
import {ReviewContext} from "../Context/ReviewContext.jsx";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {AuthContext} from "../Context/AuthContext.jsx";
import moment from "moment";
import ComentarioCard from "../Components/ComentarioCard.jsx";
import {TransContext} from "../Context/TransContext.jsx";

function DishDetail() {
    const {productoSeleccionado} = useContext(ProductContext)
    const {activeUser} = useContext(AuthContext)
    const {addItemToCart} = useContext(TransContext)
    const {
        formCreateReviewData,
        updateFormCreateReview,
        createReview,
        getComments,
        comentarios
    } = useContext(ReviewContext)


    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (productoSeleccionado) {
            addItemToCart(productoSeleccionado, quantity)
        }
    };


    useEffect(() => {
        if (!productoSeleccionado) {
            navigate('/')
        } else {
            updateFormCreateReview({...formCreateReviewData, idProducto: `${productoSeleccionado.id}`})
            getComments(productoSeleccionado.id)
        }
    }, [activeUser, productoSeleccionado]);


    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto pt-28">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
                    <Carousel
                        showThumbs={true}
                        showStatus={false}
                        infiniteLoop={true}
                        className="carousel-container rounded-lg"
                    >
                        <div>
                            <img src={productoSeleccionado?.imagen}
                                 className="max-h-96 object-contain rounded-lg"
                            />
                        </div>
                    </Carousel>
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                    <div>

                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {productoSeleccionado?.nombre}
                    </h1>

                    <div className="mb-6">
            <span className="text-2xl font-semibold text-red-600">
              Precio:
            </span>
                        <span className="ml-2 text-black text-xl">
                {productoSeleccionado?.precio}
              </span>
                    </div>

                    <h3 className="text-lg text-black font-semibold mb-2">{productoSeleccionado?.descripcion}</h3>
                    <p className="pt-10"></p>

                    <div className="mb-6">
                        <h3 className="text-lg text-black font-semibold mb-2">Cantidad:</h3>
                        <div className="text-black flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 rounded-full border hover:bg-gray-100 cursor-pointer"
                            >
                                <AiOutlineMinus className="w-5 h-5"/>
                            </button>
                            <span className="text-xl text-black  w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 rounded-full border hover:bg-gray-100 cursor-pointer"
                            >
                                <AiOutlinePlus className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 w-full bg-[#f25e53] hover:bg-[#f25e53b3] active:bg-[#f25e53] cursor-pointer text-white font-bold py-3 px-6 rounded-lg
                     transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-black text-2xl font-bold mb-4">Categorias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">
                            • {productoSeleccionado?.Categoria[0].nombre}
                            <br/>
                        </p>
                    </div>
                </div>
            </div>

            {/* COMENTARIOS */}
            <div className="text-black mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-black text-2xl font-bold mb-6">Comentarios ({comentarios?.length})</h2>

                <form onSubmit={createReview} className="mb-8">
                    <div className="flex flex-col gap-4">
                    <textarea
                        value={formCreateReviewData.texto}
                        onChange={e => updateFormCreateReview({...formCreateReviewData, texto: e.target.value})}
                        placeholder="Escribe tu comentario..."
                        className="text-black w-full p-4 border rounded-lg resize-none min-h-[100px]
                        focus:ring-2 focus:border-transparent"
                    />

                        {/* Like/Dislike Section */}
                        <div className="flex gap-6 text-2xl self-start">
                            <button
                                type="button"
                                onClick={() =>
                                    updateFormCreateReview({...formCreateReviewData, calificacion: "L"})
                                }
                                className={`transition-colors cursor-pointer ${
                                    formCreateReviewData.calificacion === "L"
                                        ? "text-[#F25E53]"
                                        : "text-gray-400 hover:text-[#F25E53]"
                                }`}
                            >
                                <FaThumbsUp/>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    updateFormCreateReview({...formCreateReviewData, calificacion: "D"})
                                }
                                className={`transition-colors cursor-pointer ${
                                    formCreateReviewData.calificacion === "D"
                                        ? "text-[#F25E53]"
                                        : "text-gray-400 hover:text-[#F25E53]"
                                }`}
                            >
                                <FaThumbsDown/>
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="self-end bg-[#f25e53] hover:bg-[#f25e53b3] active:bg-[#f25e53] cursor-pointer text-white
                       font-semibold py-2 px-6 rounded-lg flex items-center gap-2"
                        >
                            <BiSend className="text-xl"/> Publicar
                        </button>
                    </div>
                </form>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {comentarios?.map((comentario) => (
                        <ComentarioCard
                            key={comentario.id}
                            id={comentario.id}
                            nombre={comentario.Usuario.nombre}
                            avatar={comentario.Usuario.avatar}
                            createdAt={comentario.createdAt}
                            calificacion={comentario.calificacion}
                            texto={comentario.texto}/>
                    ))}

                    {comentarios?.length === 0 && (
                        <p className="text-black text-gray-500 text-center py-8">
                            Sé el primero en comentar sobre este platillo
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DishDetail;