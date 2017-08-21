import { apiUrl } from '../config';
import moment from 'moment';

// Получение точек графика
export function getGraphPoints(graphId) {

    return fetch(apiUrl + '/graph/'+graphId+'/points',
        {
            method : 'GET'
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

        })
        .catch((err) => { return err });

}

// Добавить точку графика
export function addGraphPoint(graphId, value) {

    return fetch(apiUrl + '/graph/'+graphId+'/points',
        {
            method : 'POST',
            body   : JSON.stringify({
                graphId : graphId,
                value   : value
            })
        })
        .then((response) => response.json())
        .then((json) => { return json })
        .catch((err) => { return err });

}