import './App.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import React, {useEffect, useState} from "react";
import {navItems} from "./utils/constants";
import {fetchFilials} from "./actions/filialsAction";
import {useDispatch} from "react-redux";
import SideBar from "./components/SideBar";
import Info from "./components/Info";

function App() {
    const [currentPage, setCurrentPage] = useState(navItems[3]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilials())
    }, []);

    return (
        <section className="m-5 p-5">
            <div className="row flex-nowrap">
                <div className="col-2 px-2 m-3">
                    <SideBar currentPage={setCurrentPage}/>
                </div>
                <div className="col-9 py-3 m-3">
                    <Info currentPage={currentPage}/>
                </div>
            </div>
        </section>
    );
}

export default App;
