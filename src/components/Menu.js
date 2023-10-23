import React, {useState} from 'react';

const Menu = () => {

    const rowsPerPage = 4;
    let currPage = 1;
    const table = document.getElementById("table");

    const showRows = (page) => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rows = [...table.rows];
        rows.forEach((row, index) => {
            if (index < start || index >= end) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
        });
    }

    const previousPage = () => {
        if(currPage > 1) {
            currPage--;
            showRows(currPage);
        }
    }

    const nextPage = () => {
        if (currPage < Math.ceil(table.rows.length / rowsPerPage)) {
            currPage++;
            showRows(currPage);
        }
    }

    showRows(currPage);


    const handleChange = () => {
        const filter = document.getElementById('select_active').value;
        const table = document.getElementById("table");
        const tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            tr[i].style.display = 'none';
            const td = tr[i].getElementsByTagName('td');
            for (let j = 0; j < td.length; j++) {
                const cellValue = td[j];
                if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                }
            }
        }
    }

    return (
        <article className="content">
            <table id="table" className="pagination" data-pagecount="3">
                <thead>
                    <tr className="first-row">
                        <th><input id="text" placeholder="Название меню"/></th>
                        <th><input id="text" placeholder="Филиал"/></th>
                        <th><input id="text" placeholder="Торговая точка"/></th>
                        <th>
                            <select id="select_active" onChange={handleChange}>
                                <option>активно</option>
                                <option>не активно</option>
                            </select>
                        </th>
                        <th><p>Экспорт</p></th>
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
                        <td>Какое меню 2</td>
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
                        <td>Яндекс</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                    <tr>
                        <td>Какое меню 4</td>
                        <td>Западная Москва река и лодка</td>
                        <td>Сушу кручу</td>
                        <td>Не активно</td>
                        <td>Яндекс</td>
                        <td></td>
                        <td>статистика</td>
                        <td>изменить</td>
                        <td>удалить</td>
                    </tr>
                </tbody>
                <button id="prevButton" onClick={previousPage}>Previous</button>
                <button id="nextButton" onClick={nextPage}>Next</button>
            </table>
        </article>
    );
};

export default Menu;