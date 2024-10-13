import React from 'react';
import './HeroM.css';
import nosnja_image from '../assets/Muska-nosnja.png'

const HeroM = () => {
    return(
        <div className='herom'>
            <div className="herom-left">
                <img src={nosnja_image} alt="nosnja" />
            </div>
            <div className="herom-right">
            <h2>Narodna nošnja šivena po meri</h2>
            <div>
                <p>Zablistajte u Vašoj</p>
                <p>novoj nošnji za muskarce</p>
            </div>
            </div>
        </div>
    )
}

export default HeroM