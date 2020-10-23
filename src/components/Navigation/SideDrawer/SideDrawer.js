import React from'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerCSS from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import AUX from '../../../hoc/auxs/Auxs';

const sideDrawer =(props) => {
   

    let attachedClasses =[SideDrawerCSS.SideDrawer,SideDrawerCSS.Close];
    if(props.open)
    {
        attachedClasses=[SideDrawerCSS.SideDrawer,SideDrawerCSS.Open]
       
    }
    return(
        <AUX>
            <Backdrop show = {props.open} clicked={props.closed}/>
            <div className = {attachedClasses.join(' ')} onClick={props.closed}>
                <div className={SideDrawerCSS.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </AUX>
    );
}

export default sideDrawer;