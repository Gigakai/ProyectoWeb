import {createContext, useState} from "react";


export const TransContext = createContext();

export const TransContextProvider = ({ children }) => {
    const [isCartActive , setIsCartActive] = useState(false)


    return(<TransContext.Provider value={{isCartActive, setIsCartActive}}>{children}</TransContext.Provider>)
}