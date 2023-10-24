import React, {useEffect, useState} from 'react';

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

    useEffect(() => {
        const table = document.getElementById("table");
        const trs = table.getElementsByTagName("tr");
        let pagination = document.querySelector("#pagination");
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

        let notesOnPage = 3;
        let countOfItems = Math.ceil(array.slice(1, array.length - 1).length / notesOnPage);
        let items = [];
        for (let i = 1; i <= countOfItems; i++) {
            let li = document.createElement("li");
            li.innerHTML = i;
            pagination.appendChild(li);
            items.push(li);
        }
        showPage(items[0], notesOnPage, array);

        for (let item of items) {
            item.addEventListener('click', function () {
                showPage(this, notesOnPage, array);
            });
        }
    }, []);


    const showPage = (item, notesOnPage, array) => {
        const table = document.getElementById("table");
        let active = document.querySelector("#pagination li.active");
        if (active) {
            active.classList.remove('active');
        }
        item.classList.add('active');

        let pageNum = +item.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;

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

    // const previousPage = () => {
    //
    //     if(currPage > 1) {
    //         currPage--;
    //         // showRows(currPage);
    //     }
    // }

    // const nextPage = () => {
    //     if (currPage < Math.ceil(table.rows.length / rowsPerPage)) {
    //         currPage++;
    //         // showRows(currPage);
    //     }
    // }

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
                <tbody >
                    <tr>
                        <td>Какое меню 1</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Яндекс</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td> 2</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>Какое меню 3</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>Какое меню 4</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Не активно</td>
                        <td>Яндекс</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td> 2</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>Какое меню 3</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>Какое меню 4</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Не активно</td>
                        <td>Яндекс</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу </td>
                        <td>Активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td> 2</td>
                        <td>Восточная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Мобильное приложение</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                </tbody>
                <div className="nav navigation__list my_pagination" >
                    <button className="button" >&#10094;</button>
                    <ul className="nav navigation__list" id="pagination"></ul>
                    <button className="button" >&#10095;</button>
                </div>
            </table>
        </div>
        </>
    );
};

export default Menu;