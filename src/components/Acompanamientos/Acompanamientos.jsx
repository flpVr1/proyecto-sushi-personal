import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { cartContext } from '../Context/CartContext'
import './Acompanamientos.css'

const Acompanamientos = () => {
   const [acomData, setAcomData] = useState([]);
   const { addToCart } = useContext(cartContext);

   useEffect(() => {
      // Hacer la solicitud GET a menu.json usando axios
      axios('acompanamientos.json').then((response) => {
         setAcomData(response.data.map((item) => ({ ...item, showMessage: false })));
      }).catch((error) => {
         console.error('Error al importar datos desde menu: ', error);
      });
   }, []);

   const handleAddToCart = (item) => {
      addToCart({ ...item, type: 'acompanamientos' });
      setAcomData((prevAcomData) =>
         prevAcomData.map((acomItem) =>
            acomItem.id === item.id ? { ...acomItem, showMessage: true } : acomItem
         )
      ); // Mostrar el mensaje solo en la tarjeta correspondiente
      setTimeout(() => {
         setAcomData((prevAcomData) =>
            prevAcomData.map((acomItem) =>
               acomItem.id === item.id ? { ...acomItem, showMessage: false } : acomItem
            )
         );
      }, 2000); // Ocultar el mensaje después de 2 segundos
   };

   return (
      <div className='acompanamientos' id='acompañamientos'>
         {/* Iterar sobre el array de menuData y mostrar cada tarjeta */}
         {acomData.map((item) => (
            <div className='card' key={item.id}>
               <img src={item.img} alt='item-card-img' />
               <h3>{item.name}</h3>
               <h4>$ {item.price}</h4>
               <button onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
               {item.showMessage && <p className='add-to-cart-message'>Agregado al carrito</p>} {/* Mostrar el mensaje si showMessage es true */}
            </div>
         ))};
      </div>
   );
}

export default Acompanamientos