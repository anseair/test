import {baseUrl, limitOnPage} from "../utils/constants";
import {putMenu} from "../slices/menuSlice";
import {putMaxPages} from "../slices/maxPagesSlice";
import iconStat from "../Icons/iconStat.png"
import iconEdit from "../Icons/iconEdit.png"
import iconDelete from "../Icons/iconDelete.png"

//request API - get maximum pages by filial id
 export const fetchMaxPages = (filials) => {
     return async (dispatch) => {
         const responses = await Promise.all(filials.map(f => fetch(`${baseUrl}/filial/${f.id}/menu/`, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
             }
         })));
         const data = await Promise.all(responses.map((response) => response.json()));
         const res = [];
         for (let i = 0; i < data.length; i++) {
             const info = {
                 max_pages: data[i].max_pages,
                 filial: data[i].data.map(f => f.filial)[0]
             };
             res.push(info);
         }
         dispatch(putMaxPages(res));
         localStorage.setItem('max_pages', JSON.stringify(res));
    }
};

//request API - get all menu by filial id and limit paged and filling table
export const fetchMenu = (id, limit) => {
    return async (dispatch) => {
        const  response = await fetch(`${baseUrl}/filial/${id}/menu/?limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            const res = data.data;
            dispatch(putMenu(res));
            localStorage.setItem('menu', JSON.stringify(res));

            // filling table
            const tbody = document.getElementById("data");
            let temp="";
            let active="";
            for(let i= 0; i < res.length; i++) {
                if (res[i].active === true){
                    active = 'активно'
                } else{
                    active = 'неактивно'
                }
                temp+="<tr>";
                temp+="<td>"+res[i].name+"</td>";
                temp+="<td>"+res[i].filial.name+"</td>";
                temp+="<td>"+res[i].tt.name+"</td>";
                temp+="<td>"+active+"</td>";
                temp+="<td>"+res[i].export.map(e => e)+"</td>";
                temp+="<td class='my_icon'>" + `<img width='20' height='20' src=${iconStat} />`+"</td>";
                temp+="<td class='my_icon'>" + `<img width='20' height='20' src=${iconEdit} />` + "</td>";
                temp+="<td class='my_icon'>" + `<img width='20' height='20' src=${iconDelete} />` + "</td>";
                temp+="</tr>";
            }
            tbody.innerHTML = temp;
            const rows = tbody.querySelectorAll("tr");
            const pageNum = 1;
            let start = (pageNum - 1) * limitOnPage;
            let end = pageNum * limitOnPage;

            // hiding the remaining records in the table if records in one page more than limit
            rows.forEach((row, index) => {
                if (index < start || index >= end) {
                    row.style.display = "none";
                } else {
                    row.style.display = "";
                }
            });
        } else {
            throw new Error(response.status.toString())
        }
    }
};

