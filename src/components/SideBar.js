import React, {useEffect, useState} from 'react';
import {limitOnPage, navItems} from "../utils/constants";
import NavItem from "./NavItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilials} from "../actions/filialsAction";
import {fetchMaxPages, fetchMenu} from "../actions/menuAction";

const SideBar = () => {
    const {filials} = useSelector(state => state.filials);
    const dispatch = useDispatch();
    const [pages, setPages] = useState();
    const [filialName, setFilialName] = useState();
    const [filial, setFilial] = useState();

    let currentPage = 0;

    useEffect(() => {
        const filials2 = JSON.parse(localStorage.getItem('filials'));
        const maxPages2 = JSON.parse(localStorage.getItem('max_pages'));
        const filial2 = JSON.parse(localStorage.getItem('filial'));
        if (filials2) {
            if (maxPages2) {
                setPages(maxPages2);
                if (filial2) {
                    setFilialName(filial2.name);
                    let res;
                    for (let i = 0; i < maxPages2.length; i++) {
                        if (maxPages2[i].filial.id === filial2.id && maxPages2[i].filial.name === filial2.name){
                            res = maxPages2[i];
                        }
                    }
                    setFilial(res);
                }
            } else{
                dispatch(fetchMaxPages(filials2));
            }
        } else {
            dispatch(fetchFilials());
        }
    }, []);

    const handleChange = (e) => {
        const name = e.target.value;
        const filial = filials.find(f => f.name === name);
        localStorage.setItem('filial', JSON.stringify(filial));
        setFilialName(filial.name);
        let filial2;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].filial.id === filial.id && pages[i].filial.name === filial.name){
                filial2 = pages[i];
            }
        }
        setFilial(filial2);
        const id = filial2.filial.id;
        dispatch(fetchMenu(id, filial2.max_pages));

        let pageCount = Math.ceil(filial2.max_pages/ limitOnPage );
        const paginationNumbers = document.getElementById("pagination-numbers");
        paginationNumbers.innerHTML='';
        for (let i = 1; i <= pageCount; i++) {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.innerHTML = i;
            pageNumber.setAttribute("page-index", i);
            paginationNumbers.appendChild(pageNumber);
        }
        setPage(1, filial2);
        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");
        prevButton.addEventListener("click", () => {
            setPage(currentPage - 1, filial2);
        });
        nextButton.addEventListener("click", () => {
            setPage(currentPage + 1, filial2);
        });

        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex) {
                button.addEventListener("click", () => {
                    setPage(pageIndex, filial2);
                });
            }
        });
    }

    const setPage = (pageNum, filial) => {
        currentPage = pageNum;
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
                button.classList.add("active");
            }
        });

        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");

        let filial2;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].filial.id === filial.filial.id && pages[i].filial.name === filial.filial.name){
                filial2 = pages[i];
            }
        }
        let pageCount = Math.ceil(filial2.max_pages/ limitOnPage );

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
                        <select onChange={handleChange} value={filialName}>
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