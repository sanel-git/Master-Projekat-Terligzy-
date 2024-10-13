import React from 'react'
import './Sidebar.css'
import add_product_icon from '../assets/AddProduct.png'
import list_product_icon from '../assets/Product_list_icon.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Dodaj Proizvod</p>
        </div>
      </Link>
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Lista Proizvoda</p>
        </div>
      </Link>
      
    </div>
  )
}

export default Sidebar
