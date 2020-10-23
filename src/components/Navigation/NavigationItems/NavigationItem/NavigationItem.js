import React from 'react';
import {NavLink} from 'react-router-dom';

import NavigationItemCSS from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className={NavigationItemCSS.NavigationItem}>
        <NavLink 
           to={props.link}
           exact={props.exact}
           activeClassName={NavigationItemCSS.active}>{props.children}
        </NavLink>
    </li>
);

export default navigationItem;