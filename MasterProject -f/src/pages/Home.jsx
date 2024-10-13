import React from 'react';
import HeroZ from '../components/HeroZ';
import HeroM from '../components/HeroM';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
    return(
        <div>
            <HeroZ/>
            <HeroM/>
            <Newsletter/>
        </div>
    )
}

export default Home