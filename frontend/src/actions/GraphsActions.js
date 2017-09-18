import * as actionTypes from '../constants/ActionTypes';
import * as graphApi from '../api/graphApi';

// Выбрать график из списка
export function selectGraph(id) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SELECT_GRAPH_REQUEST,
            payload : id
        });

        graphApi
            .getGraph(id)
            .then((res) => {

                dispatch({
                    type    : actionTypes.SELECT_GRAPH_SUCCESS,
                    payload : res
                });

            })
            .catch((err) => {

                dispatch({
                    type    : actionTypes.SELECT_GRAPH_ERROR,
                    payload : err
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

        graphApi
            .addGraph(name, unitId)
            .then((res) => {

                dispatch({
                    type    : actionTypes.ADD_GRAPH_SUCCESS,
                    payload : res
                });

                dispatch(hideAddGraphModal());

            })
            .catch((res) => {

                dispatch({
                    type    : actionTypes.ADD_GRAPH_ERROR,
                    payload : res
                });

            });

    }

}

// Показать модальное окно добавления графика
export function showAddGraphModal() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SHOW_ADD_GRAPH_MODAL,
            payload : null
        });
    }

}

// Скрыть модальное окно добавления графика
export function hideAddGraphModal() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.HIDE_ADD_GRAPH_MODAL,
            payload : null
        });
    }

}

// Удалить график
export function deleteGraph(id) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.DELETE_GRAPH_REQUEST,
            payload : id
        });

        graphApi.deleteGraph(id)
            .then((res) => {

                dispatch({
                    type    : actionTypes.DELETE_GRAPH_SUCCESS,
                    payload : res
                });

            })
            .catch((err) => {

                dispatch({
                    type    : actionTypes.DELETE_GRAPH_ERROR,
                    payload : err
                });

            });
    }

}

// Выбрать период отображения графика
export function setGraphPeriod(periodName) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SET_GRAPH_PERIOD,
            payload : { name: periodName }
        });
    }

}