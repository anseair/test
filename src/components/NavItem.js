import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {fetchFilials} from "../actions/filialsAction";

const NavItem = ({item}) => {


    return (
        <li >
            <Link className="link button" to={item.route}>{item.title}</Link>
        </li >
    );
};

export default NavItem;