import React, {useEffect, useState} from 'react';
import {navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilials} from "../actions/filialsAction";
import {fetchMaxPages, fetchMenu} from "../actions/menuAction";

const SideBar = () => {
    const [maxPages, setMaxPages] = useState();
    // const [filial, setFilial] = useState();
    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();
    // const [menu, setMenu] = useState();
    // const {data} = useSelector(state => state.menu);

    useEffect(() => {
        dispatch(fetchFilials())
        const maxPages2 = localStorage.getItem('max_pages');
        const filial2 = JSON.parse(localStorage.getItem('filial'));
        // const menu2 = JSON.parse(localStorage.getItem('menu'));
        if (maxPages2) {
            setMaxPages(maxPages2);
            dispatch(fetchMenu(filial2.id, maxPages2));
        } else {
            console.log("============")
            dispatch(fetchMaxPages(filial2.id))
        }
    }, []);

    const handleChange = (e) => {
        const name = e.target.value;
        const filial = filials.find(f => f.name === name);
        localStorage.setItem('filial', JSON.stringify(filial));
        // setFilial(filial);
        dispatch(fetchMaxPages(filial.id));
        dispatch(fetchMenu(filial.id,maxPages));
    }

    return (
        <>
            <table className="name">
                <thead>
                <tr className="first-row">
                    <th>НАЗВАНИЕ ФИРМЫ
                        <p>Лоскутникова В.П.</p>
                    </th>
                </tr>
                <tr>
                    <th>СКЛАДСКОЙ УЧЁТ</th>
                </tr>
                </thead>
                <tbody>
                <tr className="first-row">
                    {/*{filial &&*/}
                    <td>
                        <p>Филиалы</p>
                        <select onChange={handleChange}>
                            <option value='' disabled hidden>Выберите филиал</option>
                            {filials.map(f => {
                                return <option key={f.id} value={f.name} >{f.name}</option>
                            })}
                        </select>
                    </td>
                    {/*}*/}
                </tr>
                <tr>
                    <td>
                        <ul className="nav navigation__list">
                            {navItems.map(i => <NavItem key={i.route} item={i} />)}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default SideBar;