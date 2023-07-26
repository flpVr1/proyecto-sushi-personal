import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import Menu from '../Menu/Menu'
import Promociones from '../Promociones/Promociones'
import Acompanamientos from '../Acompanamientos/Acompanamientos'

const Home = () => {
   return (
      <>
         <Navbar />
         <h1>Menú</h1>
         <Menu />
         <h1>Promociones</h1>
         <Promociones />
         <h1>Acompañamientos</h1>
         <Acompanamientos />
      </>
   )
}

export default Home