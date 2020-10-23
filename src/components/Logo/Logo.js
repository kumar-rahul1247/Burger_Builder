import React from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import LogoCSS from './Logo.module.css'

const logo = (props) => (
    <div className={LogoCSS.Logo} >
        <img src = {BurgerLogo} alt="MyBurger"/>
    </div>
);

export default logo; 