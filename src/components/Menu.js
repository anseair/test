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
    let currentPage= 1;
    useEffect(() => {
        let pageCount = countPage();
        const paginationNumbers = document.getElementById("pagination-numbers");
        for (let i = 1; i <= pageCount; i++) {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.innerHTML = i;
            pageNumber.setAttribute("page-index", i);
            paginationNumbers.appendChild(pageNumber);
            // items.push(pageNumber);
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

        // for (let item of items) {
        //     item.addEventListener('click', function () {
        //         setPage(this, paginationLimit, pageCount);
        //     });
        // }

    }, []);

    const countPage = () => {
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
        return pageCount;
    }

    const setPage = (pageNum) => {
        currentPage = pageNum;
        // document.querySelectorAll(".pagination-number").forEach((button) => {
        //     if (button) {
        //         button.classList.remove("active");
        //     }
        //     item.classList.add('active');
        // });

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
        let paginationLimit  = 4;

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
            let start = (pageNum - 1) * paginationLimit;
            let end = pageNum * paginationLimit;
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
            <button className="pagination-button" id="prev-button">&lt;</button>
            <div id="pagination-numbers"></div>
            <button className="pagination-button" id="next-button">&gt;</button>
        </div>
        </>
    );
};

export default Menu;