import * as actionTypes from '../constants/ActionTypes';
import moment from 'moment';
import { config } from '../config';

// Получить точки графика
export function getPoints(graphId) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.GET_POINTS_REQUEST,
            payload : null
        });

        fetch(config.apiUrl + '/graph/'+graphId+'/points',
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

                dispatch({
                    type    : actionTypes.GET_POINTS_SUCCESS,
                    payload : points
                });
            })
            .catch(() => {
                dispatch({
                    type    : actionTypes.GET_POINTS_ERROR,
                    payload : null
                });
            });

    }

}

// Добавить точку
export function addPoint(value, graphId) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.ADD_POINT_REQUEST,
            payload : value
        });

        fetch(config.apiUrl + '/graph/'+graphId+'/points',
            {
                method : 'POST',
                body   : JSON.stringify({
                    value : value
                })
            })
            .then(() => {
                dispatch({
                    type    : actionTypes.ADD_POINT_SUCCESS,
                    payload : value
                });
            })
            .catch(() => {
                dispatch({
                    type    : actionTypes.ADD_POINT_ERROR,
                    payload : null
                });
            });

    }

}