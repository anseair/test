import React, {useEffect, useState} from 'react';
import {navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilials} from "../actions/filialsAction";
import {fetchMaxPages, fetchMenu} from "../actions/menuAction";
import maxPages from "../slices/maxPagesSlice";

const SideBar = () => {
    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();
    // const {maxPages} = useSelector(state => state.maxPages);
    const [allFilials, setAllFilials] = useState();
    const [pages, setPages] = useState();
    const [filialName, setFilialName] = useState();
    const [menu, setMenu] = useState();
    // const {data} = useSelector(state => state.menu);

    useEffect(() => {
        // dispatch(fetchFilials());
        const maxPages2 = localStorage.getItem('max_pages');
        const filial2 = JSON.parse(localStorage.getItem('filial'));
        const menu2 = JSON.parse(localStorage.getItem('menu'));

            if (maxPages2 && filial2 && menu2){
                setPages(maxPages2);
                setFilialName(filial2.name);
                setMenu(menu2);
            } else{
                const filial22 = filials.map(item => item).filter(item => item.name === filialName);
                localStorage.setItem('filial', JSON.stringify(filial22));
                dispatch(fetchMaxPages(filial22.id));
                dispatch(fetchMenu(filial22.id, pages));
            }

            console.log("============")
            dispatch(fetchFilials())

    }, []);

    const handleChange = (e) => {
        const name = e.target.value;
        const filial = filials.find(f => f.name === name);
        localStorage.setItem('filial', JSON.stringify(filial));
        setFilialName(filial.name);
        dispatch(fetchMaxPages(filial.id));
        dispatch(fetchMenu(filial.id,pages));
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
                        <select onChange={handleChange} value={filialName}>
                            <option value=''>Выберите филиал</option>
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