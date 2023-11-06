import React, {useEffect, useState} from 'react';
import iconStat from "../Icons/iconStat.png"
import iconEdit from "../Icons/iconEdit.png"
import iconDelete from "../Icons/iconDelete.png"
import {current} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {fetchMaxPages, fetchMenu, menuAction} from "../actions/menuAction";
import {fetchFilials, filialsAction} from "../actions/filialsAction";
import {logDOM} from "@testing-library/react";
import {limitOnPage} from "../utils/constants";
import button from "bootstrap/js/src/button";
import {
    fetchFilter,
    fetchFilterActive,
    fetchFilterFilial,
    fetchFilterName,
    fetchFilterTT
} from "../actions/filtersAction";

// section menu
const Menu = () => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState();
    const [filialName, setFilialName] = useState();
    const [filial, setFilial] = useState();

    let currentPage= 1;
    useEffect(() => {

        // get data from localstorage
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
                    let pageCount = Math.ceil(res.max_pages/ limitOnPage ); // calculating count of pages in table

                    const menu2 = JSON.parse(localStorage.getItem('menu'));
                    if (menu2) {
                        fillTable(menu2);

                        // create navigation buttons
                        const paginationNumbers = document.getElementById("pagination-numbers");
                        for (let i = 1; i <= pageCount; i++) {
                            const pageNumber = document.createElement("button");
                            pageNumber.className = "pagination-number";
                            pageNumber.innerHTML = i;
                            pageNumber.setAttribute("page-index", i);
                            paginationNumbers.appendChild(pageNumber);
                        };

                        setPage(1, res); //set first page

                        // add onClick to next-button and to prev-button
                        const nextButton = document.getElementById("next-button");
                        const prevButton = document.getElementById("prev-button");
                        prevButton.addEventListener("click", () => {
                            setPage(currentPage - 1, res);
                        });
                        nextButton.addEventListener("click", () => {
                            setPage(currentPage + 1, res);
                        });

                        //add onClick to all buttons with numbers
                        document.querySelectorAll(".pagination-number").forEach((button) => {
                            const pageIndex = Number(button.getAttribute("page-index"));
                            if (pageIndex) {
                                button.addEventListener("click", () => {
                                    setPage(pageIndex, res);
                                });
                            }
                        });
                    }
                } else{
                dispatch(fetchMaxPages(filials2));
                }
            }
        } else {
            dispatch(fetchFilials());
        }
    }, []);

    // fiiling table
    const fillTable = (data) => {
        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
        if (tbody) {
            if (data) {
                data.forEach(item => {
                    const tr = document.createElement("tr");
                    const name = document.createElement('td');
                    const filial = document.createElement('td');
                    const tt = document.createElement('td');
                    const active = document.createElement('td');
                    const exportt = document.createElement('td');
                    name.innerText = item.name;
                    filial.innerText = item.filial.name;
                    tt.innerText = item.tt.name;
                    active.innerText = item.active === true ? 'активно' : 'неактивно';
                    exportt.innerText = item.export.map(e => e);

                    const stat = document.createElement('td');
                    stat.className = "my_icon";
                    const edit = document.createElement('td');
                    edit.className = "my_icon";
                    const deletee = document.createElement('td');
                    deletee.className = "my_icon";
                    const imgStat = document.createElement('img');
                    imgStat.src = iconStat;
                    imgStat.width = 20;
                    imgStat.height = 20;
                    const imgEdit = document.createElement('img');
                    imgEdit.src = iconEdit;
                    imgEdit.width = 20;
                    imgEdit.height = 20;
                    const imgDeletee = document.createElement('img');
                    imgDeletee.src = iconDelete;
                    imgDeletee.width = 20;
                    imgDeletee.height = 20;
                    stat.appendChild(imgStat);
                    edit.appendChild(imgEdit);
                    deletee.appendChild(imgDeletee);

                    tr.appendChild(name);
                    tr.appendChild(filial);
                    tr.appendChild(tt);
                    tr.appendChild(active);
                    tr.appendChild(exportt);
                    tr.appendChild(stat);
                    tr.appendChild(edit);
                    tr.appendChild(deletee);
                    tbody.appendChild(tr);
                });
            }
        }
    }

    const setPage = (pageNum, filial) => {
        currentPage = pageNum;
        let pageCount = Math.ceil(filial.max_pages/ limitOnPage );

        // set to button classList active when button pressed
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
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
        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
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

    // filtration menu by name
    const filterMenu = () => {
        const input = document.getElementById("menu");
        const name = input.value.toUpperCase();
        dispatch(fetchFilter(filial.filial.id, filial.max_pages, "name", name))
    }

    // filtration menu by filial name
    const filterFilial = () => {
        const input = document.getElementById("filial");
        const filialName = input.value.toUpperCase();
        dispatch(fetchFilter(filial.filial.id, filial.max_pages, "filial", filialName))
    }

    // filtration menu by poion of sale name
    const filterTT = () => {
        const input = document.getElementById("tt");
        const tt = input.value.toUpperCase();
        dispatch(fetchFilter(filial.filial.id, filial.max_pages, "tt", tt))
    }

    // filtration menu by filial activity
    const filterActive = () => {
        let active = '';
        const select = document.getElementById("active");
        if (select.value === 'Активно') {
            active = 'active';
        }
        if (select.value === 'Неактивно') {
            active = 'no_active';
        }
        dispatch(fetchFilter(filial.filial.id, filial.max_pages, "active", active))
    }

    return (
        <>
            <div className="content">
                <table id="table" data-pagecount="3">
                    <thead>
                    <tr className="first-row">
                        <th><input id="menu" type="text" placeholder="Название меню"  onKeyUp={filterMenu}/></th>
                        <th><input id="filial" type="text" placeholder="Филиал" onKeyUp={filterFilial}/></th>
                        <th><input id="tt" type="text" placeholder="Торговая точка" onKeyUp={filterTT}/></th>
                        <th>
                            <select id="active" onChange={filterActive}>
                                <option value=''>Выберите</option>
                                <option>Активно</option>
                                <option>Неактивно</option>
                            </select>
                        </th>
                        <th><input id="export" type="text" placeholder="Экспорт"/></th>
                    </tr>
                    </thead>
                        <tbody id="data"></tbody>
                </table>
            </div>
            <div className="pagination-container">
                <button className="pagination-button" id="prev-button">&lt;</button>
                <div id="pagination-numbers"></div>
                <button className="pagination-button" id="next-button">&gt;</button>
            </div>
        </>
    );
};

export default Menu;