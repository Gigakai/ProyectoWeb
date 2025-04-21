import {createContext, useCallback, useEffect, useState} from "react";
import {BASE_URL, getHTTP, patchHTTP, postHTTP} from "../Utils/Services.js";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from "../../firebase.js";
import validator from "validator/es";
import {Bounce, toast} from "react-toastify";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(null)

    //States de LogIn
    const [formLogInData, setFormLogInData] = useState({email: "", password: ""})
    const [logInProgress, setLogInProgress] = useState(false)
    const [errorsLogIn, setErrorsLogIn] = useState(null)

    //States de Registro
    const [formRegisterData, setFormRegisterData] = useState({
        email: "",
        password: "",
        nombre: "",
        fechaNacimiento: "",
        telefono: "",
        avatar: null
    })
    const [registerProgress, setRegisterProgress] = useState(false)
    const [errorsRegister, setErrorsRegister] = useState(null)

    //States de Actualización
    const [formUpdateData, setFormUpdateData] = useState({password: "", nombre: "", telefono: ""})
    const [updateProgress, setUpdateProgress] = useState(false)
    const [errorsUpdateUser, setErrorsUpdateUser] = useState(null)

    useEffect(() => {
        const userInfo = localStorage.getItem("Usuario")
        setActiveUser(JSON.parse(userInfo))
    }, [])

    //LogIn Function
    const updateFormLogIn = useCallback((updatedInfo) => {
        setFormLogInData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const logInUser = useCallback(async (e) => {
        e.preventDefault()
        setErrorsLogIn(null)
        setLogInProgress(true)
        const response = await postHTTP(`${BASE_URL}/users/logIn`, formLogInData)
        setLogInProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                if (response?.errores?.incompleto) {
                    setErrorsLogIn({email: "Incompleto"})
                } else {
                    setErrorsLogIn(response?.errores)
                }

            }

            toast.error('Surgio un error al iniciar sesión', {
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

        toast.success('Se inicio sesión', {
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
        localStorage.setItem("Usuario", JSON.stringify(response?.Usuario))
        setActiveUser({...response?.Usuario})

    }, [errorsLogIn, formLogInData])


    //Firebase storage
    const uploadFile = (file, fileType) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, 'Avatar/' + fileName);
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

    //Register Function
    const updateFormRegister = useCallback((updatedInfo) => {
        setFormRegisterData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const signInUser = useCallback(async (e) => {
        e.preventDefault()

        setErrorsRegister(null)
        setRegisterProgress(true)

        const errores = {}

        if (!formRegisterData.email || !validator.isEmail(formRegisterData.email)) {
            errores.email = "Error en el email"
        } else {

            const searchUser = await getHTTP(`${BASE_URL}/users/getByEmail/${formRegisterData.email}`)

            if (searchUser?.success) {
                errores.email = "Ya existe"
            }
        }

        if (!formRegisterData.password || !validator.isStrongPassword(formRegisterData.password)) {
            errores.password = "Error en la contraseña"
        }

        if (!formRegisterData.fechaNacimiento || !validator.isDate(formRegisterData.fechaNacimiento)) {
            errores.fechaNacimiento = "Error en la fecha de Nacimiento"
        }

        if (!formRegisterData.telefono || !validator.isMobilePhone(formRegisterData.telefono, 'es-MX')) {
            errores.telefono = "Error en el Telefono"
        }

        if (!formRegisterData.nombre || !validator.isAlpha(formRegisterData.nombre, 'es-ES', {ignore: ' '}) || formRegisterData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }


        if (!formRegisterData.avatar) {
            errores.avatar = "Error en la avatar"
        }

        if (Object.keys(errores).length > 0) {
            setRegisterProgress(false)
            toast.error('Surgio un error al Registrarse', {
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
            return setErrorsRegister(errores)
        }

        let valuesSent = {
            email: formRegisterData.email,
            password: formRegisterData.password,
            nombre: formRegisterData.nombre,
            fechaNacimiento: formRegisterData.fechaNacimiento,
            telefono: formRegisterData.telefono,
            avatar: null,
            tipo: "C"
        }

        try {
            const downloadUrl = await uploadFile(formRegisterData.avatar, "Image")
            valuesSent.avatar = downloadUrl
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
            setRegisterProgress(false)
            return setErrorsRegister({avatar: "Error al Subir Imagen"})
        }

        const response = await postHTTP(`${BASE_URL}/users/register`, valuesSent)
        setRegisterProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsRegister(response?.errores)
            }
            toast.error('Surgio un error al Registrarse', {
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

        toast.success('Se registro correctamente', {
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
        localStorage.setItem("Usuario", JSON.stringify(response?.Usuario))
        setActiveUser({...response?.Usuario})
    }, [errorsRegister, formRegisterData])

    //Update Function
    const updateFormUpdate = useCallback((updatedInfo) => {
        setFormUpdateData(prevState => ({...prevState, ...updatedInfo}));
    }, [])

    const updateUserFun = useCallback(async (e) => {
        e.preventDefault()

        setErrorsUpdateUser(null)
        setUpdateProgress(true)

        const errores = {}

        if (!formUpdateData.password || !validator.isStrongPassword(formUpdateData.password)) {
            errores.password = "Error en la contraseña"
        }

        if (!formUpdateData.telefono || !validator.isMobilePhone(formUpdateData.telefono, 'es-MX')) {
            errores.telefono = "Error en el Telefono"
        }

        if (!formUpdateData.nombre || !validator.isAlpha(formUpdateData.nombre, 'es-ES', {ignore: ' '}) || formUpdateData.nombre.length < 3) {
            errores.nombre = "Error en el Nombre"
        }

        if(Object.keys(errores).length > 0) {
            setUpdateProgress(false)
            toast.error('Surgio un error al actualizar el usuario', {
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
            return setErrorsUpdateUser(errores)
        }

        let valuesSent = {
            email: activeUser.email,
            password: formUpdateData.password,
            nombre: formUpdateData.nombre,
            telefono: formUpdateData.telefono
        }

        const response = await patchHTTP(`${BASE_URL}/users/update`, valuesSent)
        setUpdateProgress(false)

        if (!response?.success) {
            if (response?.errores) {
                setErrorsUpdateUser(response?.errores)
            }
            toast.error('Surgio un error al actualizar el usuario', {
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

        toast.success('Se actualizo correctamente', {
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
        localStorage.setItem("Usuario", JSON.stringify(response?.Usuario))
        setActiveUser({...response?.Usuario})

    }, [errorsUpdateUser, formUpdateData, activeUser])


    //Log Out Functions
    const logOutUser = useCallback(async (e) => {

        toast.success('Se termino la sesión correctamente', {
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
        localStorage.removeItem("Usuario")
        setActiveUser(null)
    }, [activeUser])

    return (<AuthContext.Provider value={{
        activeUser,
        formLogInData,
        updateFormLogIn,
        formRegisterData,
        updateFormRegister,
        formUpdateData,
        setFormUpdateData,
        updateProgress,
        registerProgress,
        logInProgress,
        errorsLogIn,
        errorsRegister,
        logInUser,
        logOutUser,
        signInUser,
        setFormLogInData,
        setFormRegisterData,
        updateFormUpdate,
        updateUserFun,
        errorsUpdateUser
    }}>{children}</AuthContext.Provider>)
}