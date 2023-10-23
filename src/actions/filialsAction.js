import {baseUrl} from "../utils/constants";
import {putFilials} from "../slices/filialsSlices";

export const filialsAction = () => {
    return async (dispatch) => {
        const response = await (fetch(`${baseUrl}/filial`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors"
        }));
        if(response.ok) {
            const data = await response.json();
            const names = [];
            for (let i = 0; i < data.length; i++) {
                const info = {
                    name: data[i].name
                }
                names.push(info);
            }
            dispatch(putFilials(names));
        } else {
            throw new Error(response.status.toString());
        }
    }
};