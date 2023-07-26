import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { cartContext } from '../Context/CartContext';
import './Menu.css';

const Menu = () => {
   const [menuData, setMenuData] = useState([]);
   const { addToCart } = useContext(cartContext);

   useEffect(() => {
      // Hacer la solicitud GET a menu.json usando axios
      axios('menu.json').then((response) => {
         setMenuData(response.data.map((item) => ({ ...item, showMessage: false }))); // Agregar showMessage al estado de cada item
      }).catch((error) => {
         console.error('Error al importar datos desde menu: ', error);
      });
   }, []);

   const handleAddToCart = (item) => {
      addToCart({ ...item, type: 'menu' });
      setMenuData((prevMenuData) =>
         prevMenuData.map((menuItem) =>
            menuItem.id === item.id ? { ...menuItem, showMessage: true } : menuItem
         )
      ); // Mostrar el mensaje solo en la tarjeta correspondiente
      setTimeout(() => {
         setMenuData((prevMenuData) =>
            prevMenuData.map((menuItem) =>
               menuItem.id === item.id ? { ...menuItem, showMessage: false } : menuItem
            )
         );
      }, 2000); // Ocultar el mensaje después de 2 segundos
   };

   return (
      <div className='menu' id='menu'>
         {/* Iterar sobre el array de menuData y mostrar cada tarjeta */}
         {menuData.map((item) => (
            <div className='card' key={item.id}>
               <img src={item.img} alt='item-card-img' />
               <h3>{item.name}</h3>
               <h4>$ {item.price}</h4>
               <button onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
               {item.showMessage && <p className='add-to-cart-message'>Agregado al carrito</p>} {/* Mostrar el mensaje si showMessage es true */}
            </div>
         ))}
      </div>
   );
};

export default Menu;