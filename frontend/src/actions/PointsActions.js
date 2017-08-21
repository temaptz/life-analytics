import * as actionTypes from '../constants/ActionTypes';
import * as pointsApi from '../api/pointsApi';

// Получить точки графика
export function getPoints(graphId) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.GET_POINTS_REQUEST,
            payload : null
        });

        pointsApi
            .getGraphPoints(graphId)
            .then((points) => {

                dispatch({
                    type    : actionTypes.GET_POINTS_SUCCESS,
                    payload : points
                });

            })
            .catch((err) => {

                dispatch({
                    type    : actionTypes.GET_POINTS_ERROR,
                    payload : err
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

        pointsApi
            .addGraphPoint(graphId, value)
            .then((res) => {

                dispatch({
                    type    : actionTypes.ADD_POINT_SUCCESS,
                    payload : res
                });

            })
            .catch((err) => {

                dispatch({
                    type    : actionTypes.ADD_POINT_ERROR,
                    payload : err
                });

            });

    }

}