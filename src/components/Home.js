import React, {useState} from 'react';
import SideBar from "./SideBar";
import Info from "./Info";
import {navItems} from "../utils/constants";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(navItems[4]);
    return (
        <section className="home container-fluid m-5 p-5">
            <div className="row flex-nowrap">
                <div className="col-2 px-2 m-3">
                    <SideBar changePage={setCurrentPage}/>
                </div>
                <div className=" py-3 m-3">
                    <Info currentPage={currentPage}/>
                </div>
            </div>
        </section>
    );
};

export default Home;