import { createContext, useState } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]);
   const [itemCount, setItemCount] = useState(0);

   const increaseItemQuantity = (productId) => {
      setCart((prevCart) =>
         prevCart.map((item) =>
            item.id === productId
               ? { ...item, quanty: item.quanty + 1 }
               : item
         )
      );

      setItemCount((prevCount) => prevCount + 1); // Incrementar el contador total de productos
   };

   const decreaseItemQuantity = (productId) => {
      setCart((prevCart) =>
         prevCart.map((item) =>
            item.id === productId && item.quanty > 0
               ? { ...item, quanty: item.quanty - 1 }
               : item
         )
      );

      setItemCount((prevCount) => prevCount - 1); // Decrementar el contador total de productos
   };

   const removeFromCart = (productId) => {
      // Obtener la cantidad del item que vamos a eliminar
      const removedItem = cart.find((item) => item.id === productId);

      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

      setItemCount((prevCount) => prevCount - removedItem.quanty); // Restar la cantidad eliminada al itemCount
   };

   const addToCart = (item) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
         setCart((prevCart) =>
            prevCart.map((cartItem) =>
               cartItem.id === item.id
                  ? { ...cartItem, quanty: cartItem.quanty + 1 }
                  : cartItem
            )
         );
      } else {
         setCart((prevCart) => [...prevCart, { ...item, quanty: 1 }]);
      }

      setItemCount((prevCount) => prevCount + 1); // Aumentar el contador total de productos en el carrito
   };

   return (
      <cartContext.Provider value={{ cart, addToCart, itemCount, increaseItemQuantity, decreaseItemQuantity, removeFromCart, }} >
         {children}
      </cartContext.Provider>
   );
};

export default CartProvider;