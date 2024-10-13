import React from 'react';
import './Newsletter.css'

const Newsletter = () => {
    return (
        <div className='newsletter'>
        <h1>Dobijajte akcije, ponude i novosti na Vaš mejl</h1>
        <p>Prijavite se za naše novosti i ostanite ažurni</p>
        <div>
            <input type="email" placeholder='Vaša e-mail adresa'/>
            <button>Pretplati se</button>
        </div>
        </div>
    )
}

export default Newsletter;