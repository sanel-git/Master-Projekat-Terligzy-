import React from 'react'
import './Navbar.css'
import navlogo from '../assets/footer-logo.png'
import navprofileIcon from '../assets/Profilna.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <img src={navprofileIcon} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
