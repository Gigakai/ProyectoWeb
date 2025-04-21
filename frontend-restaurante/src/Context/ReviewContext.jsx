import {createContext, useCallback, useEffect, useState} from "react";
import {BASE_URL, getHTTP, patchHTTP, postHTTP} from "../Utils/Services.js";
import validator from "validator/es";
import {Bounce, toast} from "react-toastify";

export const ReviewContext = createContext();

export const ReviewContextProvider = ({children, activeUser}) => {
    //Contenedor de Categorias
    const [comentarios, setComentarios] = useState([]);

    //States de Crear Categoria
    const [formCreateReviewData, setFormCreateReviewData] = useState({
        idProducto: "",
        texto: "",
        calificacion: "L"
    })
    const [createReviewProgress, setCreateReviewProgress] = useState(false)
    const [errorsCreateReview, setErrorsCreateReview] = useState(null)

    //Funciones para Crear
    const updateFormCreateReview = useCallback((updatedInfo) => {
        setFormCreateReviewData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const createReview = useCallback(async (e) => {
        e.preventDefault()

        setErrorsCreateReview(null)
        setCreateReviewProgress(true)

        const errores = {}

        const findCoincidence = await getHTTP(`${BASE_URL}/reviews/getByUser/${formCreateReviewData.idProducto}/${activeUser.id}`)
        if (findCoincidence?.success) {
            if(findCoincidence?.Comentario){
                errores.coincidencia = "Ya realizaste un comentario"
            }
        }


        if (!formCreateReviewData.texto || !validator.isAlpha(formCreateReviewData.texto, 'es-ES', {ignore: ' '}) || formCreateReviewData.texto.length < 3) {
            errores.texto = "Error en el texto"
        }

        if (!formCreateReviewData.calificacion || formCreateReviewData.calificacion.length <= 0) {
            errores.calificacion = "Error en la calificacion"
        }

        if (!formCreateReviewData.idProducto || formCreateReviewData.idProducto.length <= 0) {
            errores.producto= "Error en la platillo"
        }

        if (!activeUser) {
            errores.usuario = "Error en la usuario"
        }

        if (Object.keys(errores).length > 0) {

            if(errores?.coincidencia){
                toast.error('Ya realizaste un comentario', {
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
            }else{
                toast.error('Surgio un error al crear el comentario', {
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


            setErrorsCreateReview(errores)
            setCreateReviewProgress(false)
            return
        }

        let valuesSent = {idUsuario: activeUser.id, idPlatillo: formCreateReviewData.idProducto, texto: formCreateReviewData.texto, calificacion: formCreateReviewData.calificacion}

        const response = await postHTTP(`${BASE_URL}/reviews/add`, valuesSent)
        setCreateReviewProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsCreateReview(response?.errores)
            }

            toast.error('Surgio un error al crear el comentario', {
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
            return
        }

        toast.success('Se creó correctamente el comentario', {
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

        setFormCreateReviewData({
            idProducto: formCreateReviewData.idProducto,
            texto: "",
            calificacion: "L"
        });

        const responseComments = await getHTTP(`${BASE_URL}/reviews/getByItem/${formCreateReviewData.idProducto}`)
        if (responseComments?.success) {
            setComentarios(responseComments?.Comentarios)
        }

    }, [formCreateReviewData])

    //Funciones para Obtener Comentarios de un Producto
    const getComments = useCallback(async (id) => {

        const response = await getHTTP(`${BASE_URL}/reviews/getByItem/${id}`)
        if (response?.success) {
            setComentarios(response?.Comentarios)
        }
    }, [])


    return (<ReviewContext.Provider value={{
        formCreateReviewData,
        setFormCreateReviewData,
        createReviewProgress,
        setCreateReviewProgress,
        errorsCreateReview,
        updateFormCreateReview,
        createReview,
        getComments,
        comentarios
    }}>{children}</ReviewContext.Provider>)
}