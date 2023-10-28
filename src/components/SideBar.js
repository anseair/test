import React, {useEffect, useState} from 'react';
import {navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilials} from "../actions/filialsAction";
import {fetchMenu} from "../actions/menuAction";

const SideBar = () => {
    // const {filials} = useSelector(state => state.filials);
    // const {menu} = useSelector(state => state.menu);
    // const [filial, setFilial] = useState();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchFilials());
        // const filial2 = JSON.parse(localStorage.getItem('filial'));
        // console.log(filial2);
        // const menu2 = JSON.parse(localStorage.getItem('menu'));
        // console.log(menu2);
        // if (filial2 !== 'undefined' && menu2 !== 'undefined') {
        //     setFilial(filial2);
        //     setMenu(menu2);
        // } else{
        //     console.log("==========")
        //     dispatch(fetchFilials());
        // }
    // }, []);

    // const handleChange = (e) => {
    //     const name = e.target.value;
    //     const filial = filials.find(f => f.name === name);
    //     localStorage.setItem('filial', JSON.stringify(filial));
    //     dispatch(fetchMenu(filial.id));
    // }

    return (
        <>
                {/*<table className="name">*/}
                {/*    <thead>*/}
                {/*        <tr className="first-row">*/}
                {/*            <th>НАЗВАНИЕ ФИРМЫ*/}
                {/*            <p>Лоскутникова В.П.</p>*/}
                {/*            </th>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <th>СКЛАДСКОЙ УЧЁТ</th>*/}
                {/*        </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*        <tr className="first-row">*/}
                {/*            <td>*/}
                {/*                <p>Филиалы</p>*/}
                {/*                <select onChange={handleChange}>*/}
                {/*                    <option value=''>Выберите филиал</option>*/}
                {/*                    {filials.map(f => {*/}
                {/*                        return <option key={f.id} value={f.name} >{f.name}</option>*/}
                {/*                    })}*/}
                {/*                </select>*/}
                {/*            </td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td>*/}
                {/*                <ul className="nav navigation__list">*/}
                {/*                    {navItems.map(i => <NavItem key={i.route} item={i}/>)}*/}
                {/*                </ul>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    </tbody>*/}
                {/*</table>*/}

        </>
    );
};

export default SideBar;