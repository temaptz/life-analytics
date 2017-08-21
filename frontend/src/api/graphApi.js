import { apiUrl } from '../config';

// Получение списка графиков
export function getGraphList() {

    return fetch(apiUrl + '/graph',
        {
            method : 'GET'
        })
        .then((response) => response.json())
        .then((json) => { return json })
        .catch((err) => { return err });

}

// Получить график
export function getGraph(id) {

    return fetch(apiUrl + '/graph/'+id,
        {
            method : 'GET'
        })
        .then((response) => response.json())
        .then((json) => { return json })
        .catch((err) => { return err });

}

// Добавить график
export function addGraph(name, unitId) {

    return fetch(apiUrl + '/graph',
        {
            method : 'POST',
            body   : JSON.stringify({
                name   : name,
                unitId : unitId
            })
        })
        .then((response) => response.json())
        .then((json) => { return json })
        .catch((err) => { return err });

}

// Удалить график
export function deleteGraph(id) {

    return fetch(apiUrl + '/graph/'+id,
        {
            method : 'DELETE'
        })
        .then((response) => response.json())
        .then((json) => { return json })
        .catch((err) => { return err });

}