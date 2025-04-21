import {createContext, useCallback, useEffect, useState} from "react";
import {BASE_URL, getHTTP, patchHTTP, postHTTP} from "../Utils/Services.js";
import validator from "validator/es";
import {Bounce, toast} from "react-toastify";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    //Contenedor de Categorias
    const [categories, setCategories] = useState([]);

    //States de Crear Categoria
    const [formCreateCategoryData, setFormCreateCategoryData] = useState({nombre: "", descripcion: ""})
    const [createCategoryProgress, setCreateCategoryProgress] = useState(false)
    const [errorsCreateCategory, setErrorsCreateCategory] = useState(null)

    //States de Actualizar Categoria
    const [formUpdateCategoryData, setFormUpdateCategoryData] = useState({idCategoria: "", nombre: "", descripcion: ""})
    const [updateCategoryProgress, setUpdateCategoryProgress] = useState(false)
    const [errorsUpdateCategory, setErrorsUpdateCategory] = useState(null)

    //Obtener Categorias
    useEffect(() => {
        const getCategories = async () => {
            const response = await getHTTP(`${BASE_URL}/categories/getCategories`)
            if (response?.success) {
                setCategories(response?.Categorias)
            }
        }
        getCategories()
    }, [])

    //Funciones para Crear
    const updateFormCreateCategory = useCallback((updatedInfo) => {
        setFormCreateCategoryData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const createCategory = useCallback(async (e) => {
        e.preventDefault()

        setErrorsCreateCategory(null)
        setCreateCategoryProgress(true)

        const errores = {}

        if (!formCreateCategoryData.nombre || !validator.isAlpha(formCreateCategoryData.nombre, 'es-ES', {ignore: ' '}) || formCreateCategoryData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!formCreateCategoryData.descripcion || !validator.isAlpha(formCreateCategoryData.descripcion, 'es-ES', {ignore: ' '}) || formCreateCategoryData.descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if (Object.keys(errores).length > 0) {
            toast.error('Surgio un error al crear la categoria', {
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
            setErrorsCreateCategory(errores)
            setCreateCategoryProgress(false)
            return
        }

        const response = await postHTTP(`${BASE_URL}/categories/add`, formCreateCategoryData)
        setCreateCategoryProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsCreateCategory(response?.errores)
            }

            toast.error('Surgio un error al crear la categoria', {
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

        toast.success('Se creó correctamente', {
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
        setFormCreateCategoryData({nombre: "", descripcion: ""});
        const responseCategories = await getHTTP(`${BASE_URL}/categories/getCategories`)
        if (responseCategories?.success) {
            setCategories(responseCategories?.Categorias)
        }

    }, [formCreateCategoryData])


    //Funciones para Actualizar
    const updateFormUpdateCategory = useCallback((updatedInfo) => {
        setFormUpdateCategoryData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const updateCategory = useCallback(async (e, closeFun) => {
        e.preventDefault()

        setErrorsUpdateCategory(null)
        setUpdateCategoryProgress(true)

        const errores = {}

        if (!formUpdateCategoryData.nombre || !validator.isAlpha(formUpdateCategoryData.nombre, 'es-ES', {ignore: ' '}) || formUpdateCategoryData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!formUpdateCategoryData.descripcion || !validator.isAlpha(formUpdateCategoryData.descripcion, 'es-ES', {ignore: ' '}) || formUpdateCategoryData.descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if(!formUpdateCategoryData.idCategoria || formUpdateCategoryData.idCategoria.length < 0){
            errores.id = "No se selecciono una categoria"
        }


        if (Object.keys(errores).length > 0) {
            setUpdateCategoryProgress(false)
            setErrorsUpdateCategory(errores)

            toast.error('Surgio un error al actualizar la categoria', {
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

        const response = await patchHTTP(`${BASE_URL}/categories/update`, formUpdateCategoryData)
        setUpdateCategoryProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsUpdateCategory(response?.errores)
            }

            toast.error('Surgio un error al actualizar la categoria', {
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

        toast.success('Se actualizo la categoria correctamente', {
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

        closeFun()

        const responseCategories = await getHTTP(`${BASE_URL}/categories/getCategories`)
        if (responseCategories?.success) {
            setCategories(responseCategories?.Categorias)
        }



    }, [formUpdateCategoryData])

    return (<CategoryContext.Provider value={{
        formCreateCategoryData,
        createCategoryProgress,
        setFormCreateCategoryData,
        errorsUpdateCategory,
        updateFormCreateCategory,
        formUpdateCategoryData,
        updateCategoryProgress,
        setFormUpdateCategoryData,
        errorsCreateCategory,
        updateFormUpdateCategory,
        createCategory,
        updateCategory,
        categories
    }}>{children}</CategoryContext.Provider>)
}