import {createContext, useCallback, useEffect, useState} from "react";
import {BASE_URL, getHTTP, patchHTTP, postHTTP} from "../Utils/Services.js";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from "../../firebase.js";
import validator from "validator/es";
import {Bounce, toast} from "react-toastify";
import * as path from "node:path";
import {useNavigate} from "react-router-dom";

export const ProductContext = createContext();

export const ProductContextProvider = ({children}) => {
    const navigate = useNavigate();

    //Contenedores de Productos
    const [products, setProducts] = useState(null);
    const [productsMenu, setProductsMenu] = useState(null);
    const [productsSearch, setProductsSearch] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    //States de Crear Producto
    const [formCreateProductData, setFormCreateProductData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null
    })
    const [createProductProgress, setCreateProductProgress] = useState(false)
    const [errorsCreateProduct, setErrorsCreateProduct] = useState(null)
    const [imageSrc, setImageSrc] = useState('');

    //States de Actualizar Producto
    const [formUpdateProductData, setFormUpdateProductData] = useState({
        idPlatillo: "",
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null,
        imagenAnterior: ""
    })
    const [updateProductProgress, setUpdateProductProgress] = useState(false)
    const [errorsUpdateProduct, setErrorsUpdateProduct] = useState(null)
    const [imageSrcUpd, setImageSrcUpd] = useState('');

    //States de Buscar Productos
    const [formSearchBasic, setFormSearchBasic] = useState({
        searchText: "",
        minPrice: "1",
        maxPrice: "100000",
        idCategoria: "",
        availability: "A"
    })
    const [formSearchAdv, setFormSearchAdv] = useState({
        searchText: "",
        minPrice: "0",
        maxPrice: "1000",
        idCategoria: "",
        availability: "A"
    })

    //Obtener Productos
    useEffect(() => {
        const getProducts = async () => {
            const response = await getHTTP(`${BASE_URL}/items/getAll`)
            if (response?.success) {
                setProducts(response?.Platillos)
                setProductsMenu(response?.Platillos)
            }
        }
        getProducts()
    }, [])

    //Firebase storage
    const uploadFile = (file, fileType) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, 'Platillo/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL)
                    });
                }
            );
        })

    }

    //Funciones para Crear
    const updateFormCreateProduct = useCallback((updatedInfo) => {
        setFormCreateProductData(prevState => ({...prevState, ...updatedInfo}));
    }, [])


    const createProduct = useCallback(async (e) => {
        e.preventDefault()

        setErrorsCreateProduct(null)
        setCreateProductProgress(true)

        const errores = {}

        if (!formCreateProductData.nombre || !validator.isAlpha(formCreateProductData.nombre, 'es-ES', {ignore: ' '}) || formCreateProductData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!formCreateProductData.descripcion || !validator.isAlpha(formCreateProductData.descripcion, 'es-ES', {ignore: ' '}) || formCreateProductData.descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if (!formCreateProductData.imagen) {
            errores.imagen = "Error en la imagen"
        }

        const options = {
            allow_negatives: false,
            require_decimal: false
        };

        if (!formCreateProductData.precio || !validator.isCurrency(formCreateProductData.precio, options)) {
            errores.precio = "Error en la precio"
        }

        if (!formCreateProductData.categoria || formCreateProductData.categoria <= 0) {
            errores.categoria = "Error en las categorias"
        }

        if (Object.keys(errores).length > 0) {

            toast.error('Surgio un error al crear un producto', {
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
            setErrorsCreateProduct(errores)
            setCreateProductProgress(false)
            return
        }

        let valuesSent = {
            nombre: formCreateProductData.nombre,
            descripcion: formCreateProductData.descripcion,
            precio: formCreateProductData.precio,
            imagen: null,
            categorias: [
                formCreateProductData.categoria
            ]
        }

        try {
            const downloadUrl = await uploadFile(formCreateProductData.imagen, "Image")
            valuesSent.imagen = downloadUrl

        } catch (error) {

            toast.error('Surgio un error al subir la imagen', {
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
            setCreateProductProgress(false)
            return setErrorsCreateProduct({avatar: "Error al Subir Imagen"})
        }


        const response = await postHTTP(`${BASE_URL}/items/add`, valuesSent)
        setCreateProductProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsCreateProduct(response?.errores)
            }
            toast.error('Surgio un error al crear un producto', {
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

        setFormCreateProductData({
            nombre: "",
            descripcion: "",
            precio: "",
            categoria: "",
            imagen: null
        });

        setImageSrc('')
        const responseUpdate = await getHTTP(`${BASE_URL}/items/getAll`)
        if (responseUpdate?.success) {
            setProducts(responseUpdate?.Platillos)
        }


    }, [formCreateProductData, errorsCreateProduct])

    //Funciones para Actualizar
    const updateFormUpdateProduct = useCallback((updatedInfo) => {
        setFormUpdateProductData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const updateProduct = useCallback(async (e, closeModal) => {
        e.preventDefault()

        setUpdateProductProgress(true)
        setErrorsUpdateProduct(null)

        const errores = {}

        if (!formUpdateProductData.nombre || !validator.isAlpha(formUpdateProductData.nombre, 'es-ES', {ignore: ' '}) || formUpdateProductData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if (!formUpdateProductData.descripcion || !validator.isAlpha(formUpdateProductData.descripcion, 'es-ES', {ignore: ' '}) || formUpdateProductData.descripcion.length < 3) {
            errores.descripcion = "Error en la Descripcion"
        }

        if(!formUpdateProductData.idPlatillo || formUpdateProductData.idPlatillo.length < 0){
            errores.id = "No se selecciono una categoria"
        }

        const options = {
            allow_negatives: false,
            require_decimal: false
        };

        if (!formUpdateProductData.precio || !validator.isCurrency(formUpdateProductData.precio, options)) {
            errores.precio = "Error en la precio"
        }

        if (!formUpdateProductData.categoria || formUpdateProductData.categoria <= 0) {
            errores.categoria = "Error en las categorias"
        }

        if (Object.keys(errores).length > 0) {
            toast.error('Surgio un error al actualizar un producto', {
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
            setUpdateProductProgress(false)
            setErrorsUpdateProduct(errores)
            return
        }

        let valuesSent = null
        if(formUpdateProductData.imagen){
            try {
                const downloadUrl = await uploadFile(formUpdateProductData.imagen, "Image")
                valuesSent = {
                    idPlatillo: formUpdateProductData.idPlatillo,
                    nombre: formUpdateProductData.nombre,
                    descripcion: formUpdateProductData.descripcion,
                    precio: formUpdateProductData.precio,
                    imagen: downloadUrl,
                    categorias: [
                        formUpdateProductData.categoria
                    ]
                }
            } catch (error) {

                toast.error('Surgio un error al subir la imagen', {
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
                setCreateProductProgress(false)
                return setErrorsCreateProduct({avatar: "Error al Subir Imagen"})
            }

        }else{
            valuesSent = {
                idPlatillo: formUpdateProductData.idPlatillo,
                nombre: formUpdateProductData.nombre,
                descripcion: formUpdateProductData.descripcion,
                precio: formUpdateProductData.precio,
                imagen: formUpdateProductData.imagenAnterior,
                categorias: [
                    formUpdateProductData.categoria
                ]
            }
        }

        const response = await patchHTTP(`${BASE_URL}/items/update`, valuesSent)
        setUpdateProductProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsUpdateProduct(response?.errores)
            }
            toast.error('Surgio un error al actualizar un producto', {
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

        toast.success('Se actualizo el producto correctamente', {
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


        closeModal()
        setImageSrcUpd('')

        const responseUpdate = await getHTTP(`${BASE_URL}/items/getAll`)
        if (responseUpdate?.success) {
            setProducts(responseUpdate?.Platillos)
        }
    }, [formUpdateProductData])

    //Actualizar Menu
    const menuUpdate = useCallback(async (id) => {
        try {
            const response = await getHTTP(`${BASE_URL}/items/getMenu/${id}`)
            if (response?.success) {
                setProductsMenu(response?.Platillos)
            }
        }catch (error){
            toast.error('Ocurrio un error al actualizar el menu', {
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
    }, [])


    //Funciones para Desactivar
    const disableProduct = useCallback(async (e, closeFun) => {
        e.preventDefault()

        const errores = {}

        if(!formUpdateProductData.idPlatillo || formUpdateProductData.idPlatillo.length < 0){
            errores.id = "No se selecciono un producto"
        }

        if (Object.keys(errores).length > 0) {
            toast.error('Surgio un error al intentar desactivar un producto', {
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

        let valuesSent = {
            idPlatillo: formUpdateProductData.idPlatillo,
            estatus: "D"
        }

        const response = await patchHTTP(`${BASE_URL}/items/updateStatus`, valuesSent)

        if (!response?.success) {

            toast.error('Surgio un error al intentar desactivar un producto', {
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

        toast.success('Se desactivo el producto correctamente', {
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

        const responseUpdate = await getHTTP(`${BASE_URL}/items/getAll`)
        if (responseUpdate?.success) {
            setProducts(responseUpdate?.Platillos)
            setProductsMenu(responseUpdate?.Platillos)
        }

    }, [formUpdateProductData])

    //Funciones para busquedas
    const updateFormSearchBasic = useCallback((updatedInfo) => {
        setFormSearchBasic(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const searchNavBar = useCallback(async (e) => {
        e.preventDefault()

        setProductsSearch(null)

        const errores = {}

        if (!formSearchBasic.searchText || formSearchBasic.searchText.length < 1) {
            errores.searchText = "Error en la busqueda"
        }

        if (Object.keys(errores).length > 0) {
            toast.error('No ingresaste ningun texto', {
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
            setFormSearchBasic({
                searchText: "",
                minPrice: "1",
                maxPrice: "100000",
                idCategoria: "",
                availability: "A"
            })
            return
        }


        const response = await postHTTP(`${BASE_URL}/items/filter`, formSearchBasic)
        if (response?.success) {
            toast.success('Coincidencias Encontradas', {
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
            setProductsSearch(response?.Platillos)
            navigate("/search")
        }

        setFormSearchBasic({
            searchText: "",
            minPrice: "1",
            maxPrice: "100000",
            idCategoria: "",
            availability: "A"
        })


    }, [formSearchBasic])

    //Funciones para busquedas avanzadas
    const updateFormSearchAdv = useCallback((updatedInfo) => {
        setFormSearchAdv(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const searchAdv = useCallback(async (e) => {
        e.preventDefault()

        setProductsSearch(null)

        const errores = {}

        if (!formSearchAdv.searchText || formSearchAdv.searchText.length < 1) {
            errores.searchText = "Error en la busqueda"
        }

        if (Object.keys(errores).length > 0) {
            toast.error('No ingresaste ningun texto', {
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
            setFormSearchAdv({
                searchText: "",
                minPrice: "1",
                maxPrice: "1000",
                idCategoria: "",
                availability: "A"
            })
            return
        }


        const response = await postHTTP(`${BASE_URL}/items/filter`, formSearchAdv)
        if (response?.success) {
            toast.success('Coincidencias Encontradas', {
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
            setProductsSearch(response?.Platillos)
        }

        setFormSearchAdv({
            searchText: "",
            minPrice: "1",
            maxPrice: "1000",
            idCategoria: "",
            availability: "A"
        })


    }, [formSearchAdv])



    return (<ProductContext.Provider value={{
        formCreateProductData,
        createProductProgress,
        errorsCreateProduct,
        setFormCreateProductData,
        updateFormCreateProduct,
        formUpdateProductData,
        updateProductProgress,
        errorsUpdateProduct,
        setFormUpdateProductData,
        updateFormUpdateProduct,
        createProduct,
        updateProduct,
        imageSrc,
        setImageSrc,
        products,
        productsMenu,
        menuUpdate,
        imageSrcUpd,
        setImageSrcUpd,
        disableProduct,
        setProductoSeleccionado,
        productoSeleccionado,
        searchNavBar,
        formSearchBasic,
        updateFormSearchBasic,
        productsSearch,
        searchAdv,
        updateFormSearchAdv,
        formSearchAdv
    }}>{children}</ProductContext.Provider>)
}