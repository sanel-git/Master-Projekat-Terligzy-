import React from 'react';
import './Footer.css';
import footer_logo from '../assets/footer-logo.png'
import instagram_logo from '../assets/instagram_icon.png'
import pinterest_logo from '../assets/pinterest_icon.png'
import whatsapp_logo from '../assets/whatsapp_icon.png'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={footer_logo} alt="Footer logo" />
            </div>
            <ul className="footer-links">
                <li>Firma</li>
                <li>Proizvodi</li>
                <li>O nama</li>
                <li>Kontakt</li>
            </ul>
            <div className='footer-social-icon'>
                <div className="footer-icons-container">
                <img src={instagram_logo} alt="instagram" />
                <img src={pinterest_logo} alt="pinterest" />
                <img src={whatsapp_logo} alt="whatsapp" />    
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Terligzy @2024 - Sva prava zadržana</p>
            </div>
        </div>
    )
}

export default Footer