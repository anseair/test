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
            <div className="name">
                <p>НАЗВАНИЕ ФИРМЫ</p>
                <p>Лоскутникова В.П.</p>
                <hr />
                <p>СКЛАДСКОЙ УЧЁТ</p>
            </div>
            <p>Филиалы</p>
            <select>
                <option value=''>Выберите филиал</option>
                {filials.map(f => {
                    return <option key={f} value={f}>{f}</option>
                })}
            </select>
            <hr className="m-0"/>
            <div className="d-flex flex-column aling-items-start">
                {/*<div className="navbar navbar-inverse navbar-fixed-left">*/}
                    <ul className="nav navigation__list">
                        {navItems.map(i => <NavItem key={i.route} item={i}/>)}
                    </ul>
                {/*</div>*/}
            </div>
        </>
    );
};

export default SideBar;