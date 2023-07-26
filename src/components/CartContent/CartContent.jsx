import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import './CartContent.css';

const CartContent = () => {
   const { cart, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useContext(cartContext);

   const totalPrice = cart.reduce((total, item) => total + item.price * item.quanty, 0);

   const renderCartItems = (type) => {
      const itemsOfType = cart.filter((item) => item.type === type);

      return itemsOfType.map((item) => (
         <li className='cart__li' key={item.id}>
            <img className='img-li' src={item.img} alt='img-cartContent' />
            <h3>{item.name}</h3>
            <p>Cantidad: {item.quanty}</p>
            <p>$ {item.price * item.quanty}</p>
            <div className='cart__quantity-buttons'>
               <button onClick={() => increaseItemQuantity(item.id)}>+</button>
               <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
               <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
         </li>
      ));
   };

   return (
      <div className='cart'>
         <div className='cart__logo'>
            <Link to='/'>
               <img src={logo} alt='logo' />
            </Link>
         </div>

         <div className='cart__content'>
            <h2>Carrito de Compras</h2>

            <ul className='cart__content-ul'>
               <h3>Menu</h3>
               {renderCartItems('menu')}

               <h3>Promociones</h3>
               {renderCartItems('promociones')}

               <h3>Acompañamientos</h3>
               {renderCartItems('acompanamientos')}
            </ul>

            <div className='cart__total-price'>
               <h3>Total: ${totalPrice}</h3>
            </div>
         </div>
      </div>
   );
};

export default CartContent;