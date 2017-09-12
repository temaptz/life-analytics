import { apiUrl } from '../config';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';

// Получение точек графика
export function getGraphPoints(graphId) {

    return fetch(apiUrl + '/graph/'+graphId+'/points',
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
export function addGraphPoint(graphId, value) {

    return fetch(apiUrl + '/graph/'+graphId+'/points',
        {
            method : 'POST',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            },
            body   : JSON.stringify({
                graphId : graphId,
                value   : value
            })
        })
        .then((response) => response.json())
        .then((json) => { return json });

}