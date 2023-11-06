import {baseUrl} from "../utils/constants";
import {putFilials} from "../slices/filialsSlices";
import {putMaxPages} from "../slices/maxPagesSlice";


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

            const responses = await Promise.all(data.map(f => fetch(`${baseUrl}/filial/${f.id}/menu/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })));
            const datas = await Promise.all(responses.map((response) => response.json()));
            const res = [];
            for (let i = 0; i < datas.length; i++) {
                const info = {
                    max_pages: datas[i].max_pages,
                    filial: datas[i].data.map(f => f.filial)[0]
                };
                res.push(info);
            }
            dispatch(putMaxPages(res));
            localStorage.setItem('max_pages', JSON.stringify(res));
        } else {
            throw new Error(response.status.toString());
        }
    }
};