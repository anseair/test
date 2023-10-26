import {baseUrl} from "../utils/constants";
import {putFilials} from "../slices/filialsSlices";


export const filialsAction = () => {
    return async (dispatch) => {
        const response = await (fetch(`${baseUrl}filial/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }));
        if(response.ok) {
            const data = await response.json();
            const names = data.map(d => d.name);
            dispatch(putFilials(names));
        } else {
            throw new Error(response.status.toString());
        }
    }
};