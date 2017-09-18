import { apiUrl } from '../config';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';

// Получение точек графика
export function getGraphPoints(graphId, from=null, to=null) {

    let url = apiUrl + '/graph/'+graphId+'/points';

    if ( from && to ) {
        const params = new URLSearchParams();

        params.append('from', from);
        params.append('to', to);

        url += '?' + params.toString();
    }


    return fetch(url,
        {
            method : 'GET',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            }
        })
        .then((response) => response.json())
        .then((json) => { return json });

}

// Добавить точку графика
export function addGraphPoint(graphId, value, remark) {

    return fetch(apiUrl + '/graph/'+graphId+'/points',
        {
            method : 'POST',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            },
            body   : JSON.stringify({
                graphId : graphId,
                value   : value,
                remark  : remark
            })
        })
        .then((response) => response.json())
        .then((json) => { return json });

}