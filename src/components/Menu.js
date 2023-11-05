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

const Menu = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.menu);

    const filter = (name, num) => {
        const input = document.getElementById(name);
        const filter = input.value.toUpperCase();
        const tbody = document.getElementById("data");
        const rows = tbody.querySelectorAll("tr");
        const pageNum = 1;
        let start = (pageNum - 1) * limitOnPage;
        let end = pageNum * limitOnPage;
        let filterRows = [];

        if (filter){
            for (let i = 0; i < rows.length; i++) {
                const td = rows[i].getElementsByTagName("td")[num];
                if (td) {
                    const txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = "";
                        filterRows.push(rows[i]);
                        filterRows.forEach((row, index) => {
                            if (index < start || index >= end) {
                                row.style.display = "none";
                            } else {
                                row.style.display = "";
                            }
                        });

                        const array = [];
                        for (let i = 0; i < filterRows.length; i++) {
                            let th_td = filterRows[i].getElementsByTagName('td');
                            if (th_td.length == 0) {
                                th_td = filterRows[i].getElementsByTagName('th');
                            }
                            let th_td_array = Array.from(th_td);
                            th_td_array = th_td_array.map(tag => tag.innerText);
                            array.push(th_td_array);
                        }

                        let pageCount = Math.ceil(filterRows.length / limitOnPage );
                        const paginationNumbers = document.getElementById("pagination-numbers");
                        paginationNumbers.innerHTML='';
                        for (let i = 1; i <= pageCount; i++) {
                            const pageNumber = document.createElement("button");
                            pageNumber.className = "pagination-number";
                            pageNumber.innerHTML = i;
                            pageNumber.setAttribute("page-index", i);
                            paginationNumbers.appendChild(pageNumber);
                        };
                        setPage(1);
                        const nextButton = document.getElementById("next-button");
                        const prevButton = document.getElementById("prev-button");
                        prevButton.addEventListener("click", () => {
                            setPage(currentPage - 1);
                        });
                        nextButton.addEventListener("click", () => {
                            setPage(currentPage + 1);
                        });

                        document.querySelectorAll(".pagination-number").forEach((button) => {
                            const pageIndex = Number(button.getAttribute("page-index"));
                            if (pageIndex) {
                                button.addEventListener("click", () => {
                                    setPage(pageIndex);
                                });
                            }
                        });

                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }



        }
        else {
            rows.forEach((row, index) => {
                if (index < start || index >= end) {
                    row.style.display = "none";
                } else {
                    row.style.display = "";
                }
            });
        }



    }

    const filterMenu = () => {
        filter("menu", 0);
    }

    const filterFilial = () => {
        filter("filial", 1)
    }

    const filterPoint = () => {
        filter("point", 2)
    }

    const filterExport = () => {
        filter("export", 4)
    }

    const filterActive = () => {
        const select = document.getElementById("active");
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");
        const selected = [...select.selectedOptions].map(option => option.value);
        for (let i = 1; i < tr.length; i++) {
            tr[i].style.display = 'none';
            const td = tr[i].getElementsByTagName('td');
            for (let j = 0; j < td.length; j++) {
                const cellValue = td[j];
                if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(selected[0]) > -1) {
                    tr[i].style.display = '';
                }
            }
        }
    }

    let currentPage= 1;
    useEffect(() => {
        const menu2 = JSON.parse(localStorage.getItem('menu'));
        if (menu2) {
            let pageCount = countPage(menu2);
            const paginationNumbers = document.getElementById("pagination-numbers");
            for (let i = 1; i <= pageCount; i++) {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";
                pageNumber.innerHTML = i;
                pageNumber.setAttribute("page-index", i);
                paginationNumbers.appendChild(pageNumber);
            };
            setPage(1);

            const nextButton = document.getElementById("next-button");
            const prevButton = document.getElementById("prev-button");
            prevButton.addEventListener("click", () => {
                setPage(currentPage - 1);
            });
            nextButton.addEventListener("click", () => {
                setPage(currentPage + 1);
            });

            document.querySelectorAll(".pagination-number").forEach((button) => {
                const pageIndex = Number(button.getAttribute("page-index"));
                if (pageIndex) {
                    button.addEventListener("click", () => {
                        setPage(pageIndex);
                    });
                }
            });
        }
    }, []);

    const countPage = (data) => {
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
        const trs = tbody.querySelectorAll("tr");
        const array = [];
        for (let tr of trs) {
            let th_td = tr.getElementsByTagName('td');
            if (th_td.length == 0) {
                th_td = tr.getElementsByTagName('th');
            }
            let th_td_array = Array.from(th_td); // convert HTMLCollection to an Array
            th_td_array = th_td_array.map(tag => tag.innerText); // get the text of each element
            array.push(th_td_array);
        }
        let pageCount = Math.ceil(array.length / limitOnPage );
        return pageCount;
    }

    const setPage = (pageNum) => {
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

        let pageCount = countPage();

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

    return (
        <>
            <div className="content">
                <table id="table" data-pagecount="3">
                    <thead>
                    <tr className="first-row">
                        <th><input id="menu" type="text" placeholder="Название меню"  onKeyUp={filterMenu}/></th>
                        <th><input id="filial" type="text" placeholder="Филиал" onKeyUp={filterFilial}/></th>
                        <th><input id="point" type="text" placeholder="Торговая точка" onKeyUp={filterPoint}/></th>
                        <th>
                            <select id="active" onChange={filterActive}>
                                <option>активно</option>
                                <option>неактивно</option>
                            </select>
                        </th>
                        <th><input id="export" type="text" placeholder="Экспорт" onKeyUp={filterExport}/></th>
                    </tr>
                    </thead>
                        <tbody id="data">
                        {/*{data.map(data => (*/}
                        {/*    <tr>*/}
                        {/*        <td>{data.name}</td>*/}
                        {/*        <td>{data.filial.name}</td>*/}
                        {/*        <td>{data.tt.name}</td>*/}
                        {/*        <td>{data.active === true ? 'активно' : 'неактивно'}</td>*/}
                        {/*        <td>{data.export.map(e => e)}</td>*/}
                        {/*        <td className="my_icon"><img width='20' height='20' src={iconStat}/></td>*/}
                        {/*        <td className="my_icon"><img width='20' height='20' src={iconEdit}/></td>*/}
                        {/*        <td className="my_icon"><img width='20' height='20' src={iconDelete}/></td>*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                        </tbody>
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