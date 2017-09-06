import { apiUrl } from '../config';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';
import moment from 'moment';

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
        .then((json) => {

            let points = [];
            json.forEach((item) => {
                let itemMoment = moment(item.date);
                points.push({
                    value    : parseFloat(item.value),
                    date     : itemMoment.format('DD.MM.YYYY HH:mm'),
                    unixtime : itemMoment.unix()
                });
            });

            return points;

        });

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