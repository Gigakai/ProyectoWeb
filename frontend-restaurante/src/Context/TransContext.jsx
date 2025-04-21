import {createContext, useCallback, useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";
import {BASE_URL, getHTTP, postHTTP} from "../Utils/Services.js";
import validator from "validator/es";
import {useNavigate} from "react-router-dom";


export const TransContext = createContext();

export const TransContextProvider = ({ children, activeUser }) => {
    const navigate = useNavigate();

    const [isCartActive , setIsCartActive] = useState(false)
    const [orders , setOrders] = useState(null)
    const [total , setTotal] = useState("0.00")
    const [subtotal , setSubtotal] = useState("0.00")

    //States de Direccion
    const [formRegisterAddress, setFormRegisterAddress] = useState({
        calle: "",
        noCasa: "",
        colonia: "",
        municipio: "",
        estado: "",
    })
    const [registerAddressProgress, setRegisterAddressProgress] = useState(false)
    const [errorsRegisterAddress, setErrorsRegisterAddress] = useState(null)
    const [addressRegistrada , setAddressRegistrada] = useState("")

    //States de Metodo de Pago
    const [formRegisterPayment, setFormRegisterPayment] = useState({
        numberCard: "",
        csv: "",
        nombre: "",
        fechaVencimiento: ""
    })
    const [paymentProgress, setPaymentProgress] = useState(false)
    const [errorsRegisterPayment, setErrorsRegisterPayment] = useState(null)

    //Productos en el carrito
    const [cartItems, setCartItems] = useState([])

    //Obtener Pedidos
    useEffect(() => {
        const getOrders = async () => {
            if(activeUser){
                const response = await getHTTP(`${BASE_URL}/orders/getOrders/${activeUser.id}`)
                if (response?.success) {
                    setOrders(response?.Ordenes)
                    console.log(response)
                }
            }else{
                setOrders(null)
            }
        }
        getOrders()
    }, [activeUser]);

    //Calculos
    const IVA = 0.16;
    useEffect(() => {
        const newSubtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);
        const newTotal = newSubtotal * (1 + IVA);

        // Redondear a dos decimales
        setSubtotal(newSubtotal.toFixed(2));
        setTotal(newTotal.toFixed(2));
    }, [cartItems]);

    //Agregar Item
    const addItemToCart = useCallback( (item, cantidad) => {
        if(activeUser){
            if (item) {
                const newItem = {
                    id: item.id,
                    cantidad,
                    nombre: item.nombre,
                    imagen: item.imagen,
                    precio: item.precio
                };

                setCartItems(prevItems => {
                    const exists = prevItems.some(i => i.id === item.id);
                    if (exists) {
                        return prevItems.map(i => i.id === item.id ? newItem : i);
                    } else {
                        return [...prevItems, newItem];
                    }
                });

                toast.success('Se agrego al carrito exitosamente', {
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
                toast.error('Ocurrio un error al agregar un producto al carrito', {
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
        }else{
            toast.info('Para realizar esta acción, es necesario iniciar sesion', {
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


    }, [cartItems, subtotal, activeUser]);

    //Quitar Item
    const removeItem = useCallback( (id) => {
        if (id) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            toast.success('Se elimino el articulo correctamente', {
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

    }, [cartItems, subtotal]);

    //Validar direccion
    const updateFormRegisterAddress = useCallback((updatedInfo) => {
        setFormRegisterAddress(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const registerAddress = useCallback( (e, closeFun) => {
        e.preventDefault();

        setErrorsRegisterAddress(null)
        setRegisterAddressProgress(false)

        const errores = {}

        if (!validator.isLength(formRegisterAddress.calle, { min: 3 })) {
            errores.calle = "La calle debe tener al menos 3 caracteres.";
        }

        if (!validator.isNumeric(formRegisterAddress.noCasa)) {
            errores.noCasa = "El número de casa debe ser numérico.";
        }

        if (!validator.isLength(formRegisterAddress.colonia, { min: 3 })) {
            errores.colonia = "La colonia es inválida.";
        }

        if (!validator.isAlpha(formRegisterAddress.municipio.replace(/\s/g, ""), 'es-ES')) {
            errores.municipio = "El municipio debe contener solo letras.";
        }

        if (!validator.isLength(formRegisterAddress.estado, { min: 3 })) {
            errores.estado = "La colonia es inválida.";
        }


        if (Object.keys(errores).length > 0) {
            setRegisterAddressProgress(false)
            toast.error('Información ingresada invalida', {
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
            return setErrorsRegisterAddress(errores)
        }

        setAddressRegistrada(`${formRegisterAddress.calle}, ${formRegisterAddress.noCasa}, ${formRegisterAddress.colonia}, ${formRegisterAddress.municipio}, ${formRegisterAddress.estado}`)
        setRegisterAddressProgress(false)
        closeFun()
        toast.success('Se ingreso la direcccion correctamente', {
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

    }, [formRegisterAddress]);

    //Realizar Compra
    const updateFormRegisterPayment = useCallback((updatedInfo) => {
        setFormRegisterPayment(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const payOrder = useCallback( async (e) => {
        e.preventDefault();

        setErrorsRegisterPayment(null)
        setPaymentProgress(false)

        const errores = {}

        if(cartItems.length <= 0){
            errores.carrito = "El carrito esta vacio.";
        }

        if(addressRegistrada.length <= 0){
            errores.direccion = "No ingesaste una dirección.";
        }

        if (!validator.isLength(formRegisterPayment.csv, { min: 3, max: 3 }) || !validator.isNumeric(formRegisterPayment.csv)) {
            errores.csv = "El CSV debe tener exactamente 3 dígitos numéricos.";
        }

        if (!validator.isLength(formRegisterPayment.numberCard, { min: 16, max: 16 }) || !validator.isNumeric(formRegisterPayment.numberCard)) {
            errores.numberCard = "El número de tarjeta debe tener exactamente 16 dígitos numéricos.";
        } else if (!validator.isCreditCard(formRegisterPayment.numberCard)) {
            errores.numberCard = "El número de tarjeta no es válido (falló validación).";
        }

        if (!validator.matches(formRegisterPayment.nombre, /^[a-zA-ZÀ-ÿ\s]+$/)) {
            errores.nombre = "El nombre del titular solo debe contener letras.";
        }

        if (!validator.matches(formRegisterPayment.fechaVencimiento, /^(0[1-9]|1[0-2])\/\d{2}$/)) {
            errores.fechaVencimiento = "Formato de fecha inválido. Usa MM/YY.";
        } else {
            const [mes, año] = formRegisterPayment.fechaVencimiento.split("/").map(x => parseInt(x));
            const añoActual = new Date().getFullYear() % 100;
            const mesActual = new Date().getMonth() + 1;

            if (año < añoActual || (año === añoActual && mes < mesActual)) {
                errores.fechaVencimiento = "La tarjeta está vencida.";
            }
        }


        if (Object.keys(errores).length > 0) {
            if(errores?.carrito){
                toast.error('No tienes articulos en el carrito', {
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
                if(errores?.direccion){
                    toast.error('Necesitas ingresar una dirección para proceder con el pago', {
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
                    toast.error('Ocurrio un error con la información de pago', {
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
            }

            setPaymentProgress(false)
            setErrorsRegisterPayment(errores)
            return
        }

        let valuesSent = {idUsuario: activeUser?.id, direccion: addressRegistrada, platillos: cartItems}

        const response = await postHTTP(`${BASE_URL}/orders/add`, valuesSent)

        if(response?.success){
            let valuesSentPay = {nombre: formRegisterPayment.nombre, tipo: "C", fechaVencimiento: formRegisterPayment.fechaVencimiento, idUsuario: activeUser?.id, ultimosDigitos: formRegisterPayment.numberCard.slice(-4), idPedido: response.Orden.id}
            const responsePayMethod = await postHTTP(`${BASE_URL}/payments/add`, valuesSentPay)
            if(responsePayMethod?.success){
                setCartItems([])
                navigate("/profile")
                setFormRegisterPayment({
                    numberCard: "",
                    csv: "",
                    nombre: "",
                    fechaVencimiento: ""
                })
                toast.success('Se realizo el pedido', {
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
                toast.error('Surgio un error al realizar el pedido', {
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
            setPaymentProgress(false)
        }else{
            toast.error('Surgio un error al realizar el pedido', {
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
            setPaymentProgress(false)
        }




    }, [formRegisterPayment, addressRegistrada, cartItems]);

    return(<TransContext.Provider value={{
        isCartActive,
        setIsCartActive,
        addItemToCart,
        cartItems,
        removeItem,
        registerAddress,
        updateFormRegisterAddress,
        formRegisterAddress,
        registerAddressProgress,
        errorsRegisterAddress,
        addressRegistrada,
        setAddressRegistrada,
        setFormRegisterAddress,
        updateFormRegisterPayment,
        formRegisterPayment,
        payOrder,
        errorsRegisterPayment,
        total,
        subtotal,
        orders
    }}>{children}</TransContext.Provider>)
}