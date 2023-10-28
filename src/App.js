import './App.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import React, {useEffect, useState} from "react";
import {navItems} from "./utils/constants";
import SideBar from "./components/SideBar";
import Info from "./components/Info";
import * as app from "react";
import {Route, Routes} from "react-router-dom";
import Menu from "./components/Menu";
import ErrorPage from "./components/ErrorPage";
import NavItem from "./components/NavItem";
import {fetchMenu} from "./actions/menuAction";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilials} from "./actions/filialsAction";

function App() {
    // const [currentPage, setCurrentPage] = useState(navItems[4]);

    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu);

    useEffect(() => {
        dispatch(fetchFilials());
        let pagination = document.querySelector(".navigation__list");
        let li = pagination.getElementsByTagName("li");
        // let button = li.querySelector(".button");
        let active = document.querySelector(".navigation__list li  .button.active");
        if (active) {
            active.classList.remove('active');
        }
        li[0].classList.add('active');
    }, []);

    const handleChange = (e) => {
        const name = e.target.value;
        const filial = filials.find(f => f.name === name);
        localStorage.setItem('filial', JSON.stringify(filial));
        dispatch(fetchMenu(filial.id, 1));
    }

    return (
        <section className="home container-fluid m-5 p-5">
            <div className="row flex-nowrap">
                <div className="col-2 px-2 m-3">
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
                                <select onChange={handleChange}>
                                    <option value=''>Выберите филиал</option>
                                    {filials.map(f => {
                                        return <option key={f.id} value={f.name} >{f.name}</option>
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
                    {/*<SideBar currentPage={setCurrentPage}/>*/}
                </div>
                <div className="py-3 m-3">
                    <Routes>
                        <Route path={'/'} element={<Menu menu={menu}/>}/>
                        <Route path={navItems[3].route} element={<Menu menu={menu}/>}/>
                        {/*<Route path={navItems[0].route} element={<Components/>}/>*/}
                        {/*<Route path={navItems[1].route} element={<SemiFinished/>}/>*/}
                        {/*<Route path={navItems[2].route} element={<Tovars/>}/>*/}
                        {/*<Route path={navItems[4].route} element={<Movements/>}/>*/}
                        {/*<Route path={navItems[5].route} element={<Inventory/>}/>*/}
                        {/*<Route path={navItems[6].route} element={<Release/>}/>*/}
                        {/*<Route path={navItems[7].route} element={<WriteOff/>}/>*/}
                        {/*<Route path={navItems[9].route} element={<Invoices/>}/>*/}
                        <Route path={"*"} element={<ErrorPage/>}/>
                    </Routes>
                    {/*<Info currentPage={currentPage}/>*/}
                </div>
            </div>
        </section>
    );
}

export default App;
