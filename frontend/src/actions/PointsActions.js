import * as actionTypes from '../constants/ActionTypes';
import * as pointsApi from '../api/pointsApi';

// Добавить точку
export function addPoint(value, remark, graphId) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.ADD_POINT_REQUEST,
            payload : value
        });

        pointsApi
            .addGraphPoint(graphId, value, remark)
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