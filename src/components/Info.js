import React from 'react';
import {Route, Routes} from "react-router-dom";
import {navItems} from "../utils/constants";
import Menu from "./Menu";
import ErrorPage from "./ErrorPage";

const Info = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Menu />}/>
            <Route path={navItems[3].route} element={<Menu/>}/>
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
    );
};

export default Info;