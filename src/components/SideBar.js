import React, {useEffect, useState} from 'react';
import {limit, navItems} from "../utils/constants";
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

        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML=''
        let pageCount = 0;
        pageCount = Math.ceil(filial2.max_pages/ limit );

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

    // const func = () => {
    //     const table = document.getElementById("table");
    //     const tbody = table.querySelector("tbody");
    //     tbody.innerHTML=''
    //     let pageCount = countPage();
    //     const paginationNumbers = document.getElementById("pagination-numbers");
    //     for (let i = 1; i <= pageCount; i++) {
    //         const pageNumber = document.createElement("button");
    //         pageNumber.className = "pagination-number";
    //         pageNumber.innerHTML = i;
    //         pageNumber.setAttribute("page-index", i);
    //         paginationNumbers.appendChild(pageNumber);
    //     }
    //     setPage(1);
    //
    //     const nextButton = document.getElementById("next-button");
    //     const prevButton = document.getElementById("prev-button");
    //     prevButton.addEventListener("click", () => {
    //         setPage(currentPage - 1);
    //     });
    //     nextButton.addEventListener("click", () => {
    //         setPage(currentPage + 1);
    //     });
    //
    //     document.querySelectorAll(".pagination-number").forEach((button) => {
    //         const pageIndex = Number(button.getAttribute("page-index"));
    //         if (pageIndex) {
    //             button.addEventListener("click", () => {
    //                 setPage(pageIndex);
    //             });
    //         }
    //     });
    // }

    // const countPage = (filial) => {
        // const tbody = document.getElementById("data");
        // if (tbody) {
        //     console.log(tbody)
        //     // if (data) {
        //     //     data.forEach(item => {
        //     //         const tr = document.createElement("tr");
        //     //         const name = document.createElement('td');
        //     //         const filial = document.createElement('td');
        //     //         const tt = document.createElement('td');
        //     //         const active = document.createElement('td');
        //     //         const exportt = document.createElement('td');
        //     //         name.innerText = item.name;
        //     //         filial.innerText = item.filial.name;
        //     //         tt.innerText = item.tt.name;
        //     //         active.innerText = item.active === true ? 'активно' : 'неактивно';
        //     //         exportt.innerText = item.export.map(e => e);
        //     //
        //     //         const stat = document.createElement('td');
        //     //         stat.className = "my_icon";
        //     //         const edit = document.createElement('td');
        //     //         edit.className = "my_icon";
        //     //         const deletee = document.createElement('td');
        //     //         deletee.className = "my_icon";
        //     //         const imgStat = document.createElement('img');
        //     //         imgStat.src = iconStat;
        //     //         imgStat.width = 20;
        //     //         imgStat.height = 20;
        //     //         const imgEdit = document.createElement('img');
        //     //         imgEdit.src = iconEdit;
        //     //         imgEdit.width = 20;
        //     //         imgEdit.height = 20;
        //     //         const imgDeletee = document.createElement('img');
        //     //         imgDeletee.src = iconDelete;
        //     //         imgDeletee.width = 20;
        //     //         imgDeletee.height = 20;
        //     //         stat.appendChild(imgStat);
        //     //         edit.appendChild(imgEdit);
        //     //         deletee.appendChild(imgDeletee);
        //     //
        //     //         tr.appendChild(name);
        //     //         tr.appendChild(filial);
        //     //         tr.appendChild(tt);
        //     //         tr.appendChild(active);
        //     //         tr.appendChild(exportt);
        //     //         tr.appendChild(stat);
        //     //         tr.appendChild(edit);
        //     //         tr.appendChild(deletee);
        //     //         tbody.appendChild(tr);
        //     //     });
        //     // }
        // }
        // const trs = tbody.querySelectorAll("tr");
        // console.log(trs)
        // const array = [];
        // for (let tr of trs) {
        //     let th_td = tr.getElementsByTagName('td');
        //     if (th_td.length == 0) {
        //         th_td = tr.getElementsByTagName('th');
        //     }
        //     let th_td_array = Array.from(th_td);
        //     th_td_array = th_td_array.map(tag => tag.innerText);
        //     array.push(th_td_array);
        // }
        // console.log(array)
        // console.log(pages)
        // console.log(filial)
        // let filial2;
        // for (let i = 0; i < pages.length; i++) {
        //     if (pages[i].filial.id === filial.filial.id && pages[i].filial.name === filial.filial.name){
        //         filial2 = pages[i];
        //     }
        // }
        // let paginationLimit = limit;
        // let pageCount = Math.ceil(filial2.max_pages/ paginationLimit );
        // return pageCount;
    // }

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
        let pageCount = 0;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].filial.id === filial.filial.id && pages[i].filial.name === filial.filial.name){
                filial2 = pages[i];
            }
        }
        pageCount = Math.ceil(filial2.max_pages/ limit );

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

        let start = (pageNum - 1) * limit;
        let end = pageNum * limit;
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