import React, { ReactNode, createContext, useContext, useState } from "react";

interface ConfirmDialogContextProviderProps {
    children: ReactNode;
}
interface ConfirmContextType {
    isShowNotification: boolean;
    ProduceID: number;
    handleCloseNotification: () => void;
    handleShowNotification: () => void;
    handleUpdateProduceID: (id: number) => void;
}

const ConfirmDialogContext = createContext<ConfirmContextType>({} as ConfirmContextType);

export function ConfirmDialogContextProvider({ children }: ConfirmDialogContextProviderProps) {
   
    const [isShowNotification, setIsShowNotification] = useState(false);
    const [ProduceID, setProvinceID] = useState<number>(0);
    const handleCloseNotification = () => {
        setIsShowNotification(false);
    };
    const handleShowNotification = () => {
        setIsShowNotification(true);
    };
    const handleUpdateProduceID = (id: number) =>{
        setProvinceID(id);
    }
    return(
        <ConfirmDialogContext.Provider value={{isShowNotification,ProduceID, handleCloseNotification, handleShowNotification, handleUpdateProduceID}}>
            {children}
        </ConfirmDialogContext.Provider>
    )
}
export default function useConfirmDialogContext() {
    return useContext(ConfirmDialogContext)
}