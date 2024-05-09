// lạy gõ createContext không hiện ra đề xuất, ra đề xuất lãng xet
import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import LaptopModel from "../models/LaptopModel";
import PictureModel from "../models/PictureModel";
import { takeAllPictureOfOneLaptop } from "../api/PictureAPI";
import { error } from "console";
import CartItemModel from "../models/CartItemModel";

type ShoppingContextProviderProps = {
    // ReactNode take all type data
    children: ReactNode
}
interface ShoppingContextType {
    cartQty: number;
    totalPrice: number;
    cartItems: CartItemModel[];
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
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [listPicture, setListPicture] = useState<PictureModel[]>([]);
    const cartQty = cartItems.reduce((qty, item) => qty + item.getProduceQty(), 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.getProduceQty() * item.getProduceSellingPrice(), 0)
    const LOCAL_CART_ITEMS = 'cartItems';
    useEffect(() => {

        if (cartItems.length > 0) {

            try {
                localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(cartItems));
            } catch (e) {
                console.log(e);
            }
        }
    }, [cartItems])

    useEffect(() => {
        if (cartItems.length == 0) {

            const cartValue = localStorage.getItem(LOCAL_CART_ITEMS);
            let cartItemTest: CartItemModel[] = [];

            if (cartValue) {

                const object = JSON.parse(cartValue);

                for (let i = 0; i < object.length; i++) {
                    const pictureTest: PictureModel = new PictureModel(
                        object[i].produceThumbnail.pictureID,
                        object[i].produceThumbnail.icons,
                        object[i].produceThumbnail.pictureName,
                        object[i].produceThumbnail.pictureLink,
                        object[i].produceThumbnail.pictureData
                    )
                    const cart: CartItemModel = new CartItemModel(object[i].produceID, object[i].produceName, object[i].produceSellingPrice, object[i].produceQty, pictureTest)
                    console.log(cart.getProduceName());
                    cartItemTest.push(cart);

                }

                // const cartItemTemp: CartItemModel[] =  JSON.parse(cartValue)[0];
                // cartItemTemp.map(item => {
                //     const cart = new CartItemModel(
                //         item.getProduceID(),
                //         item.getProduceName(),
                //         item.getProduceSellingPrice(),
                //         item.getProduceQty() + 1,
                //         item.getProduceThumbnail()
                //     )
                //     cartItemTest.push(cart);
                // })
                //  setCartItems(cartItemTemp);
            }
            // console.log(cartItemTest[0].getProduceName());
            // setCartItems(cartValue? JSON.parse(cartValue) : []);
            setCartItems(cartItemTest);
        }

    }, [])


    const increaseQty = (id: number) => {

        const currentCartItem = cartItems.find(item => item.getProduceID() === id)
        if (currentCartItem) {
            const newCartItems = cartItems.map(item => {
                if (item.getProduceID() === id) {
                    //copy all existing properties of the item and increments the produceQty by 1
                    return new CartItemModel(
                        item.getProduceID(),
                        item.getProduceName(),
                        item.getProduceSellingPrice(),
                        item.getProduceQty() + 1,
                        item.getProduceThumbnail()
                    )
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
        const currentCartItem = cartItems.find(item => item.getProduceID() === id)
        if (currentCartItem) {
            if (currentCartItem.getProduceQty() == 1) {
                // do nothing
            } else {
                const newCartItems = cartItems.map(item => {
                    if (item.getProduceID() === id) {
                        //copy all existing properties of the item and decrements the produceQty by 1
                        return new CartItemModel(
                            item.getProduceID(),
                            item.getProduceName(),
                            item.getProduceSellingPrice(),
                            item.getProduceQty() - 1,
                            item.getProduceThumbnail()
                        )
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

        takeAllPictureOfOneLaptop(product.getLaptopID()).then(
            pictureData => {
                const pictureResult = pictureData[0];
                if (product) {
                    const currentCartItem = cartItems.find(item => item.getProduceID() === product.getLaptopID())
                    if (currentCartItem) {
                        const newCartItems = cartItems.map(item => {
                            if (item.getProduceID() === product.getLaptopID()) {
                                return new CartItemModel(
                                    item.getProduceID(),
                                    item.getProduceName(),
                                    item.getProduceSellingPrice(),
                                    item.getProduceQty() + 1,
                                    item.getProduceThumbnail()
                                )
                            } else {
                                return item
                            }
                        })
                        setCartItems(newCartItems)

                    } else {
                        // const newCartItem = {...product, produceQty: 1}
                        const newCartItem = new CartItemModel(
                            product.getLaptopID(),
                            product.getLaptopName(),
                            product.getSellingPrice(),
                            1,
                            pictureResult
                        );

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
        const currentCartItemIndex = cartItems.findIndex(item => item.getProduceID() === id);

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
