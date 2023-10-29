import React, {useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";

const NavItem = ({item}) => {

    return (
        <li >
            <NavLink
                activeclassname="active"
                className='link button'
                to={item.route} >{item.title}</NavLink>
        </li >
    );
};

export default NavItem;