import React, { ReactNode, createContext, useContext, useState } from "react";

interface InformDialogContextProviderProps {
    children: ReactNode;
}

interface InformContextType {
    isShowNotification: boolean;
   
    handleCloseNotification: () => void;
    handleShowNotification: () => void;
}

const InformDialogContext = createContext<InformContextType>({} as InformContextType);

export function InformDialogContextProvider({ children }: InformDialogContextProviderProps) {
    const [isShowNotification, setIsShowNotification] = useState(false);
   

    const handleCloseNotification = () => {
        setIsShowNotification(false);
    };
    const handleShowNotification = () => {
       
        setIsShowNotification(true);
        setTimeout(()=>{
            setIsShowNotification(false);
        }, 900);
    };
   

    return(
        <InformDialogContext.Provider value={{isShowNotification, handleCloseNotification, handleShowNotification}}>
            {children}
        </InformDialogContext.Provider>
    )

}

export default function useInformDialogContext() {
    return useContext(InformDialogContext)
}