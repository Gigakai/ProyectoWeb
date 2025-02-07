import {createContext, useContext, useState} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [activeUser , setActiveUser] = useState(null)

    return(<AuthContext.Provider value={{activeUser}}>{children}</AuthContext.Provider>)
}