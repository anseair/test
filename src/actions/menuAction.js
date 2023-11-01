import {baseUrl} from "../utils/constants";
import {putMenu} from "../slices/menuSlice";
import {pendingPages, putMaxPages} from "../slices/maxPagesSlice";

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
        } else {
            throw new Error(response.status.toString())
        }
    }
};