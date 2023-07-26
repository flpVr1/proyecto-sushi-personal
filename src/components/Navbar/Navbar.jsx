import React, { useContext } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import './Navbar.css'

const Navbar = () => {
   const { itemCount } = useContext(cartContext);

   return (
      <div className='navbar'>
         <div className='navbar__logo'>
            <Link to='/'>
               <img src={logo} alt='logo' />
            </Link>
         </div>

         <div className='navbar__links'>
            <nav>
               <ul>
                  <li>
                     <a href='#menu'>Menú</a>
                  </li>
                  <li>
                     <a href='#promociones'>Promociones</a>
                  </li>
                  <li>
                     <a href='#acompañamientos'>Acompañamientos</a>
                  </li>
                  <Link to='/carrito'>
                     Carrito <span className='item-count'>{itemCount}</span>
                  </Link>
               </ul>
            </nav>
         </div>
      </div>
   )
}

export default Navbar