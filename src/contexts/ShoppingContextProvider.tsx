// lạy gõ createContext không hiện ra đề xuất, ra đề xuất lãng xet
import { ReactNode, useContext, useEffect, useState, createContext } from "react";

import LaptopModel from "../models/LaptopModel";
import PictureModel from "../models/PictureModel";
import { takeAllPictureOfOneLaptop } from "../api/PictureAPI";
import { error } from "console";


type ShoppingContextProviderProps = {
    // ReactNode take all type data
    children: ReactNode
}

type CartItem = {
    produceID: number;
    produceName: string;
    produceSellingPrice: number;
    produceQty: number;
    produceThumbnail: PictureModel;
}

interface ShoppingContextType {
    cartQty: number;
    totalPrice: number;
    cartItems: CartItem[];
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    addCartItem: (item: LaptopModel) => void;
    removeCartItem: (id: number) => void;
    clearCart: () => void;
}

const ShoppingContext = createContext<ShoppingContextType>({} as ShoppingContextType);

export const useShoppingContext = () => {
    return useContext(ShoppingContext)
}

export const ShoppingContextProvider = ({ children }: ShoppingContextProviderProps) => {


    const [informError, setInformError] = useState(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [listPicture, setListPicture] = useState<PictureModel[]>([]);
    const cartQty = cartItems.reduce((qty, item) => qty + item.produceQty, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.produceQty * item.produceSellingPrice, 0)

    const increaseQty = (id: number) => {
        console.log("increaseQty => ", id)
        const currentCartItem = cartItems.find(item => item.produceID === id)
        if (currentCartItem) {
            const newCartItems = cartItems.map(item => {
                if (item.produceID === id) {
                    //copy all existing properties of the item and increments the produceQty by 1
                    return { ...item, produceQty: item.produceQty + 1 }
                } else {
                    // if not return the original item 
                    return item;
                }
            })
            setCartItems(newCartItems);
        }
    }

    const decreaseQty = (id: number) => {
        console.log("decreaseQty => ", id)
        const currentCartItem = cartItems.find(item => item.produceID === id)
        if (currentCartItem) {
            if (currentCartItem.produceQty == 1) {
                // do nothing
            } else {
                const newCartItems = cartItems.map(item => {
                    if (item.produceID === id) {
                        //copy all existing properties of the item and decrements the produceQty by 1
                        return { ...item, produceQty: item.produceQty - 1 }
                    } else {
                        // if not return the original item 
                        return item;
                    }
                })
                setCartItems(newCartItems);
            }
        }
    }



    const addCartItem = (product: LaptopModel) => {

        console.log("product => ", product)

        takeAllPictureOfOneLaptop(product.getLaptopID()).then(
            pictureData => {
                const pictureResult = pictureData[0];
                if (product) {
                    const currentCartItem = cartItems.find(item => item.produceID === product.getLaptopID())
                    if (currentCartItem) {
                        const newCartItems = cartItems.map(item => {
                            if (item.produceID === product.getLaptopID()) {
                                return { ...item, produceQty: item.produceQty + 1 }
                            } else {
                                return item
                            }
                        })
                        setCartItems(newCartItems)
                    } else {
                        // const newCartItem = {...product, produceQty: 1}

                        const newCartItem = {
                            produceID: product.getLaptopID(),
                            produceName: product.getLaptopName(),
                            produceSellingPrice: product.getSellingPrice(),
                            produceQty: 1,
                            produceThumbnail: pictureResult
                        }
                        //  copy all the elements from cartItems, and add newCartItem
                        // If want to modify have to use map const updatedCartItems = cartItems.map(item => {
                        //     if (item.produceID === product.getLaptopID()) {
                        //         // Modify the item here
                        //         return { ...item, produceQty: item.produceQty + 1 };
                        //     } else {
                        //         return item;
                        //     }
                        // });
                        setCartItems([...cartItems, newCartItem]);
                    }
                }
            }
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }

    const removeCartItem = (id: number) => {
        console.log("removeCartItem =>", id)
        //find currentCardItem follow id
        const currentCartItemIndex = cartItems.findIndex(item => item.produceID === id);
        
        const newCartItem = [...cartItems];
        // have to create newCartItem, don't allow using direct on cartItems exist (don't update)
        newCartItem.splice(currentCartItemIndex, 1);
        setCartItems(newCartItem);
    }

    const clearCart = () => {
      setCartItems([])
    }
    return (
        <ShoppingContext.Provider value={{ cartItems, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, removeCartItem, clearCart }}>
            {children}
        </ShoppingContext.Provider>
    )
}
