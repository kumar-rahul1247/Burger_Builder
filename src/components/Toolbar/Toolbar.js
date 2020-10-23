import  React from 'react';
import ToolbarCSS from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={ToolbarCSS.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo/>
        <nav className={ToolbarCSS.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth} />
        </nav>
    </header>
);

export default toolbar;