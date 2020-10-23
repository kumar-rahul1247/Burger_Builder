import React from 'react';
import NavigationItemsCSS from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={NavigationItemsCSS.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {/* <NavigationItem link="/check">Check</NavigationItem> */}
        {! props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            :<NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export  default navigationItems;