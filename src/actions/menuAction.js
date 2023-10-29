import {baseUrl, limit} from "../utils/constants";
import {putMenu} from "../slices/menuSlice";

export const fetchMenu = (id, page) => {
    return async (dispatch) => {
        const  response = await fetch(`${baseUrl}/filial/${id}/menu/?limit=${limit}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(putMenu(data));
            localStorage.setItem('menu', JSON.stringify(data));
        } else {
            throw new Error(response.status.toString())
        }
    }
};