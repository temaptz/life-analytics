import { apiUrl } from '../config';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';

// Получение списка графиков
export function getGraphList() {

    return fetch(apiUrl + '/graph',
        {
            method : 'GET',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            }
        })
        .then((response) => response.json())
        .then((json) => { return json });

}

// Получить график
export function getGraph(id) {

    return fetch(apiUrl + '/graph/'+id,
        {
            method : 'GET',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            }
        })
        .then((response) => response.json())
        .then((json) => { return json });

}

// Добавить график
export function addGraph(name, unitId) {

    return fetch(apiUrl + '/graph',
        {
            method : 'POST',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            },
            body   : JSON.stringify({
                name   : name,
                unitId : unitId
            })
        })
        .then((response) => response.json())
        .then((json) => { return json });

}

// Удалить график
export function deleteGraph(id) {

    return fetch(apiUrl + '/graph/'+id,
        {
            method : 'DELETE',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            }
        })
        .then((response) => response.json())
        .then((json) => { return json });

}