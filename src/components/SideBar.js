import React, {useEffect, useState} from 'react';
import {limitOnPage, navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchMaxPages, fetchMenu} from "../actions/menuAction";
import {fetchFilials} from "../actions/filialsAction";
import img2 from '../Icons/img2.png'
import iconFirma from '../Icons/iconFirma.png'

//left panel in the application with selection filial and navigation in the app
const SideBar = () => {
    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();
    const [filialName, setFilialName] = useState();
    const maxPages = useSelector(state => state.maxPages);

    let currentPage = 0;

    useEffect(() => {

        //get data from localStorage
        const maxPages2 = JSON.parse(localStorage.getItem('max_pages'));
        const filial2 = JSON.parse(localStorage.getItem('filial'));
        const filials2 = JSON.parse(localStorage.getItem('filials'));
        if (filials2) {
            if (maxPages2) {
                if (filial2) {
                    setFilialName(filial2.name);
                }
            } else {
                dispatch(fetchMaxPages(filials2));
            }
        } else {
            dispatch(fetchFilials());
        }
    }, []);

    // select filial and get menu by filial
    const handleChange = (e) => {
        const name = e.target.value; //get name selected filial
        if (name) {
            const filial = filials.find(f => f.name === name);
            localStorage.setItem('filial', JSON.stringify(filial));
            setFilialName(filial.name);
            let filial2;
            for (let i = 0; i < maxPages.length; i++) {
                if (maxPages[i].filial.id === filial.id && maxPages[i].filial.name === filial.name){ // search for the required filial
                    filial2 = maxPages[i];
                }
            }
            const id = filial2.filial.id;
            dispatch(fetchMenu(id, filial2.max_pages)); //request  menu by id and limit paged

            let pageCount = Math.ceil(filial2.max_pages/ limitOnPage ); // calculating count of pages in table

            // create navigation buttons
            const paginationNumbers = document.getElementById("pagination-numbers");
            paginationNumbers.innerHTML='';
            for (let i = 1; i <= pageCount; i++) {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";
                pageNumber.innerHTML = i;
                pageNumber.setAttribute("page-index", i);
                paginationNumbers.appendChild(pageNumber);
            }

            setPage(1, filial2); // set first page

            // add onClick to next-button and to prev-button
            const nextButton = document.getElementById("next-button");
            const prevButton = document.getElementById("prev-button");
            prevButton.addEventListener("click", () => {
                setPage(currentPage - 1, filial2);
            });
            nextButton.addEventListener("click", () => {
                setPage(currentPage + 1, filial2);
            });

            //add onClick to all buttons with numbers
            document.querySelectorAll(".pagination-number").forEach((button) => {
                const pageIndex = Number(button.getAttribute("page-index"));
                if (pageIndex) {
                    button.addEventListener("click", () => {
                        setPage(pageIndex, filial2);
                    });
                }
            });
        }
    }


    const setPage = (pageNum, filial) => {
        currentPage = pageNum;
        let pageCount = Math.ceil(filial.max_pages/ limitOnPage );

        // set to button classList active when button pressed
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex === currentPage) {
                button.classList.add("active");
            }
        });

        //set disable and enable to button when navigation on number finished
        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");
        if (currentPage === 1) {
            disableButton(prevButton);
        } else {
            enableButton(prevButton);
        }
        if (pageCount === currentPage) {
            disableButton(nextButton);
        } else {
            enableButton(nextButton);
        }

        // hiding the remaining records in the table if records in one page more than limit
        let start = (pageNum - 1) * limitOnPage;
        let end = pageNum * limitOnPage;
        const tbody = document.getElementById("data");
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            if (index < start || index >= end) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
        });
    };

    const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    };

    return (
        <>
            <table className="name">
                <thead>
                <tr className="first-row">
                    <th>
                        <img src={iconFirma} width="35" height="35" className="m-1"/>
                        <span className="firma">
                            НАЗВАНИЕ ФИРМЫ
                            <p>Лоскутникова В.П.</p>
                        </span>
                    </th>
                </tr>
                <tr>
                    <th>
                        <img src={img2} width="42" height="42"/>
                        <span className="sklad">СКЛАДСКОЙ УЧЁТ</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="first-row">
                    <td>
                        <p>Филиалы</p>
                        <select id="filial" onChange={handleChange} value={filialName}>
                            <option value=''>Выберите филиал</option>
                            {filials.map(f => {
                                return <option key={f.id} value={f.name} >{f.name}</option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr >
                    {/*<nav>*/}
                    <td className="nav navigation__list">
                        {/*<ul className="nav navigation__list">*/}
                            {navItems.map(i => <NavItem key={i.route} item={i} />)}
                        {/*</ul>*/}
                    </td>
                    {/*</nav>*/}
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default SideBar;