import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

const DishDetail = () => {
  const { state: dishData } = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", {
      ...dishData,
      quantity
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    
    const comment = {
      id: Date.now(),
      author: "Tú", 
      text: newComment,
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto pt-28">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <Carousel
            showThumbs={true}
            showStatus={false}
            infiniteLoop={true}
            className="carousel-container"
          >
            <div>
              <img 
                src={dishData.img} 
                alt={dishData.title} 
                className="max-h-96 object-contain"
              />
            </div>
          </Carousel>
        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {dishData.title}
          </h1>
          
          <div className="mb-6">
            <span className="text-2xl font-semibold text-red-600">
              {dishData.price}
            </span>
            {dishData.originalPrice && (
              <span className="ml-2 text-gray-500 line-through">
                {dishData.originalPrice}
              </span>
            )}
          </div>

          <h3 className="text-lg text-black font-semibold mb-2">rico en nutrientes. Rico en proteínas, sin gluten y de origen local</h3>
          <p className="pt-10"></p>

          <div className="mb-6">
            <h3 className="text-lg text-black font-semibold mb-2">Cantidad:</h3>
            <div className="text-black flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full border hover:bg-gray-100"
              >
                <AiOutlineMinus className="w-5 h-5" />
              </button>
              <span className="text-xl text-black  w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full border hover:bg-gray-100"
              >
                <AiOutlinePlus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg 
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
              • Picoso
              <br />
              • Sabroso
              <br />
              • Salado
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              • Vegano
              <br />
              • Agridulce
              <br />
              • Pastas
            </p>
          </div>
        </div>
      </div>

      {/* COMENTARIOS */}
      <div className="text-black mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-black text-2xl font-bold mb-6">Comentarios ({comments.length})</h2>
        
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex flex-col gap-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="text-black w-full p-4 border rounded-lg resize-y min-h-[100px]
                        focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="self-end bg-yellow-400 hover:bg-yellow-500 text-black 
                       font-semibold py-2 px-6 rounded-lg flex items-center gap-2"
            >
              <BiSend className="text-xl" /> Publicar
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg">{comment.author}</span>
                    <span className="text-gray-500 text-sm">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
                {comment.author === "Tú" && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 
                             transition-opacity px-2 py-1 hover:bg-red-50 rounded"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {comments.length === 0 && (
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