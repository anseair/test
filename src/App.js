import './App.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import React, {useState} from "react";
import {navItems} from "./utils/constants";
import SideBar from "./components/SideBar";
import Info from "./components/Info";

function App() {
    const [currentPage, setCurrentPage] = useState(navItems[4]);
    return (
        <section className="home container-fluid m-5 p-5">
            <div className="row flex-nowrap">
                <div className="col-2 px-2 m-3">
                    <SideBar changePage={setCurrentPage}/>
                </div>
                <div className="py-3 m-3">
                    <Info currentPage={currentPage}/>
                </div>
            </div>
        </section>
    );
}

export default App;
