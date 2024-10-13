import React from 'react';
import './HeroZ.css';
import nosnja_image from '../assets/Zene-nosnja.png'

const HeroZ = () => {
    return(
        <div className='heroz'>
            <div className="heroz-left">
            <h2>Dobrodošli na sajt goranske najkvalitetnije narodne nošnje</h2>
            <div>
                <p>Najlepše kolekcije</p>
                <p>za žene i devojke</p>
            </div>
            </div>
            <div className="heroz-right">
                <img src={nosnja_image} alt="nosnja" />
            </div>
        </div>
    )
}

export default HeroZ