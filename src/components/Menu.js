import React, {useEffect, useState} from 'react';
import iconStat from "../Icons/iconStat.png"
import iconEdit from "../Icons/iconEdit.png"
import iconDelete from "../Icons/iconDelete.png"
import {current} from "@reduxjs/toolkit";

const Menu = () => {

    const filter = (name, num) => {
        const input = document.getElementById(name);
        const filter = input.value.toUpperCase();
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            const td = tr[i].getElementsByTagName("td")[num];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
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

    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let currentPage= 1;

        const paginationNumbers = document.getElementById("pagination-numbers"); //pagination
        // const paginatedList = document.getElementById("paginated-list"); //table
        // const listItems = paginatedList.querySelectorAll("li"); // trs

        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
        const trs = tbody.querySelectorAll("tr");
        // let pagination = document.querySelector("#pagination");
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
        let paginationLimit  = 4;
       let pageCount = Math.ceil(array.length / paginationLimit );
        let items = [];

        for (let i = 1; i <= pageCount; i++) {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.innerHTML = i;
            pageNumber.setAttribute("page-index", i);
            paginationNumbers.appendChild(pageNumber);
            items.push(pageNumber);
        };

        setPage(items[0], paginationLimit, pageCount);


        // document.querySelectorAll(".pagination-number").forEach((button) => {
        //     const pageIndex = Number(button.getAttribute("page-index"));
        //     if (pageIndex) {
        //         button.addEventListener("click", () => {
        //             setPage(pageIndex);
        //         });
        //     }
        // });
        for (let item of items) {
            item.addEventListener('click', function () {
                setPage(this, paginationLimit, pageCount);
            });
        }


        // for (let i = 1; i <= pageCount; i++) {
            // let li = document.createElement("li");
            // li.innerHTML = i;
            // paginationNumbers.appendChild(li);
            // items.push(li);
        // }
        // showPage(items[0], notesOnPage, array);


        // for (let item of items) {
        //     item.addEventListener('click', function () {
        //         showPage(this, notesOnPage, array);
        //     });
        // }
    }, []);

    const setPage = (item, paginationLimit, pageCount) => {
        let currentPage = 1;

        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");
        document.querySelectorAll(".pagination-number").forEach((button) => {
            if (button) {
                button.classList.remove("active");
            }
            item.classList.add('active');
        });

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

            let pageNum = +item.innerHTML;
            let start = (pageNum- 1) * paginationLimit;
            let end = start + paginationLimit;

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

    // const showPage = (item, notesOnPage, array) => {
    //     const table = document.getElementById("table");
    //     let active = document.querySelector("#pagination li.active");
    //     if (active) {
    //         active.classList.remove('active');
    //     }
    //     item.classList.add('active');
    //
    //     let pageNum = +item.innerHTML;
    //     let start = (pageNum - 1) * notesOnPage;
    //     let end = start + notesOnPage;
    //
    //     const tbody = table.querySelector("tbody");
    //     const rows = tbody.querySelectorAll("tr");
    //     rows.forEach((row, index) => {
    //         if (index < start || index >= end) {
    //             row.style.display = "none";
    //         } else {
    //             row.style.display = "";
    //         }
    //     });
    // };

    const prevPage = () => {
    }

    const nextPage = () => {
    }

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
                                <option>не активно</option>
                            </select>
                        </th>
                        <th><input id="export" type="text" placeholder="Экспорт" onKeyUp={filterExport}/></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Какое меню 1</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Яндекс</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td> 2</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Какое меню 3</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Какое меню 4</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Не активно</td>
                        <td>Яндекс</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td> 6</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Какое меню 7</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Какое меню 8</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Не активно</td>
                        <td>Яндекс</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                    <tr>
                        <td> 10</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconStat}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconEdit}/>
                        </td>
                        <td className="my_icon">
                            <img width="20" height="20" src={iconDelete}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    <div className="pagination-container">
        <button className="pagination-button" id="prev-button" onClick={prevPage}>
            &lt;
        </button>

        <div id="pagination-numbers">
        </div>
        {/*<ul id="pagination"></ul>*/}

        <button className="pagination-button" id="next-button" onClick={nextPage}>
            &gt;
        </button>
        {/*<div className="nav navigation__list my_pagination" >*/}
        {/*<button className="button">&lt;</button>*/}
        {/*<ul id="pagination"></ul>*/}
        {/*<button className="button">&gt;</button>*/}
    </div>
            </>
    );
};

export default Menu;