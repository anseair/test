import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({item}) => {
    return (
        <li >
            <Link className="link button form__button" to={item.route}>{item.title}</Link>
        </li >
    );
};

export default NavItem;