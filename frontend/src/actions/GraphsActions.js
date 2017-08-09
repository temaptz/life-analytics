import * as actionTypes from '../constants/ActionTypes';
import { getPoints } from './PointsActions';
import { config } from '../config';

// Получение списка графиков
export function getGraphList() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.GET_GRAPH_LIST_REQUEST,
            payload : name
        });

        fetch(config.apiUrl + '/graph',
            {
                method : 'GET'
            })
            .then((response) => response.json())
            .then((json) => {
                dispatch({
                    type    : actionTypes.GET_GRAPH_LIST_SUCCESS,
                    payload : json
                });

                dispatch(selectGraph(json[0]['_id']));
            })
            .catch(() => {
                dispatch({
                    type    : actionTypes.GET_GRAPH_LIST_ERROR,
                    payload : null
                });
            });

    }

}

// Выбрать график из списка
export function selectGraph(id) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SELECT_GRAPH_REQUEST,
            payload : id
        });

        fetch(config.apiUrl + '/graph/'+id,
            {
                method : 'GET'
            })
            .then((response) => response.json())
            .then((json) => {

                dispatch({
                    type    : actionTypes.SELECT_GRAPH_SUCCESS,
                    payload : id
                });

                dispatch(getPoints(id));
            })
            .catch(() => {
                dispatch({
                    type    : actionTypes.GET_GRAPH_LIST_ERROR,
                    payload : null
                });
            });
    }

}

// Добавление графика
export function addGraph(name, unitId) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.ADD_GRAPH_REQUEST,
            payload : name
        });

        fetch(config.apiUrl + '/graph',
            {
                method : 'POST',
                body   : JSON.stringify({
                    name   : name,
                    unitId : unitId
                })
            })
            .then(() => {
                dispatch({
                    type    : actionTypes.ADD_GRAPH_SUCCESS,
                    payload : name
                });
            })
            .catch(() => {
                dispatch({
                    type    : actionTypes.ADD_GRAPH_ERROR,
                    payload : null
                });
            });

    }

}

// Показать модальное окно добавления графика
export function showAddGraphModal() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SHOW_ADD_GRAPH_MODAL,
            payload : true
        });
    }

}

// Скрыть модальное окно добавления графика
export function hideAddGraphModal() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.HIDE_ADD_GRAPH_MODAL,
            payload : false
        });
    }

}