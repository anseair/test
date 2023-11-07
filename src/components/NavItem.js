import React from 'react';
import {NavLink} from "react-router-dom";

const NavItem = ({item}) => {
    return (
        <nav>
            <NavLink
                activeclassname="active"
                className='link button'
                to={item.route} >{item.title}
            </NavLink>
        </nav>
    );
};

export default NavItem;