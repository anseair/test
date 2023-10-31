import {baseUrl} from "../utils/constants";
import {putFilials} from "../slices/filialsSlices";


export const fetchFilials = () => {
    return async (dispatch) => {
        const response = await (fetch(`${baseUrl}/filial/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }));
        if(response.ok) {
            const data = await response.json();
            dispatch(putFilials(data));
            localStorage.setItem('filials', JSON.stringify(data));

        } else {
            throw new Error(response.status.toString());
        }
    }
};