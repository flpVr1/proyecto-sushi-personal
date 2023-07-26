import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { cartContext } from '../Context/CartContext';
import './Promociones.css';

const Promociones = () => {
   const [promoData, setPromoData] = useState([]);
   const { addToCart } = useContext(cartContext);

   useEffect(() => {
      // Hacer la solicitud GET a promociones.json usando axios
      axios('promociones.json').then((response) => {
         setPromoData(response.data.map((item) => ({ ...item, showMessage: false })));
      }).catch((error) => {
         console.error('Error al importar datos desde las promociones: ', error);
      });
   }, []);

   const handleAddToCart = (item) => {
      addToCart({ ...item, type: 'promociones' });
      setPromoData((prevPromoData) =>
         prevPromoData.map((promoItem) =>
            promoItem.id === item.id ? { ...promoItem, showMessage: true } : promoItem
         )
      ); // Muestra el mensaje solo en la tarjeta correspondiente
      setTimeout(() => {
         setPromoData((prevPromoData) =>
            prevPromoData.map((promoItem) =>
               promoItem.id === item.id ? { ...promoItem, showMessage: false } : promoItem
            )
         );
      }, 2000); //Ocultar el mensaje despues de 2 segundos
   };

   return (
      <div className='promociones' id='promociones'>
         {/* Iterar sobre el array de promoData y mostrar cada tarjeta */}
         {promoData.map((item) => (
            <div className='card' key={item.id}>
               <img src={item.img} alt='item-promo-card' />
               <h3>{item.name}</h3>
               <h4>{item.price}</h4>
               <button onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
               {item.showMessage && <p className='add-to-cart-message'>Agregado al carrito</p>}
            </div>
         ))};
      </div>
   );
};

export default Promociones;