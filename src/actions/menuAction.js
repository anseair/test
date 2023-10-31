import {baseUrl, limit} from "../utils/constants";
import {putMenu} from "../slices/menuSlice";
import {putMaxPages} from "../slices/maxPagesSlice";

export const fetchMaxPages = (id) => {
    return async (dispatch) => {
        const  response = await fetch(`${baseUrl}/filial/${id}/menu/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            const res = data.max_pages;
            dispatch(putMaxPages(res));
            localStorage.setItem('max_pages', JSON.stringify(res));
        } else {
            throw new Error(response.status.toString())
        }
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