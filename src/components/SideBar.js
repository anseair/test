import React, {useEffect} from 'react';
import {navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {filialsAction} from "../actions/filialsAction";

const SideBar = () => {
    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filialsAction());
    }, []);

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
                            <td>
                                <p>Филиалы</p>
                                <select>
                                    <option value=''>Выберите филиал</option>
                                    {filials.map(f => {
                                        return <option key={f} value={f}>{f}</option>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul className="nav navigation__list">
                                    {navItems.map(i => <NavItem key={i.route} item={i}/>)}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </>
    );
};

export default SideBar;