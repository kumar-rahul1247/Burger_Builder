import React from 'react';
import DrawerToggleCSS from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div 
        className = {DrawerToggleCSS.DrawerToggle} 
        onClick={props.clicked}>
            <div/>
            <div/>
            <div/>

        </div>
);

export default drawerToggle;
