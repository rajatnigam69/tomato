import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState(food_list);
  const [cartAmount, setCartAmount] = useState(0);
  const url = import.meta.env.VITE_SERVER_URL;
  console.log(url);

  const addToCart = async (itemId) => {
    console.log(cartItems, itemId);
    // itemId = Number(itemId)
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

  };

  const removeFromCart = async (itemId, del = false) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: del ? 0 : prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };


  useEffect(() => {
    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = foodList.find((product) => product._id === item);
          totalAmount += itemInfo?.price * cartItems[item];
        }
      }
      return totalAmount;
    };

    setCartAmount(getTotalCartAmount());
  }, [cartItems, foodList]);

  const contextValue = {
    url,
    token,
    setToken,
    foodList,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartAmount,
    setCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
