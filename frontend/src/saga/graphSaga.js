import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as graphApi from '../api/graphApi';
import * as pointsApi from '../api/pointsApi';

// Выбор текущего графика после обновлении списка графиков
function* selectDefaultGraph(action) {
    try {

        const state        = yield select(),
            graphList      = state.Graph.graphList,
            defaultGraphId = graphList[0]._id || '',
            lastGraphId    = state.Graph.id;

        let selectedGraphId = lastGraphId;

        if ( selectedGraphId ) {

            let selectedGraphIdExistsInGraphList = graphList.some((graph) => {

                return graph._id === selectedGraphId;

            });

            if ( !selectedGraphIdExistsInGraphList ) {

                selectedGraphId = defaultGraphId;

            }

        } else {

            selectedGraphId = defaultGraphId;

        }

        if ( selectedGraphId !== lastGraphId ) {

            yield put({
                type: actionTypes.SELECT_GRAPH_REQUEST,
                payload: null
            });

            const graph = yield call(graphApi.getGraph, selectedGraphId);

            yield put({
                type: actionTypes.SELECT_GRAPH_SUCCESS,
                payload: graph
            });

        }

    } catch (e) {

        yield put({
            type: actionTypes.SELECT_GRAPH_ERROR,
            payload: null
        });

    }
}

// Получение точек графика после выбора графика
function* getGraphPoints(action) {
    try {

        const state = yield select();

        yield put({
            type: actionTypes.GET_POINTS_REQUEST,
            payload: null
        });

        const points = yield call(pointsApi.getGraphPoints, state.Graph.id);

        yield put({
            type: actionTypes.GET_POINTS_SUCCESS,
            payload: points
        });

    } catch (e) {

        yield put({
            type: actionTypes.GET_POINTS_ERROR,
            payload: null
        });

    }
}

// Обновление списка графиков после добавления или удаления графика
function* updateGraphList(action) {
    try {

        yield put({
            type: actionTypes.GET_GRAPH_LIST_REQUEST,
            payload: null
        });

        const points = yield call(graphApi.getGraphList);

        yield put({
            type: actionTypes.GET_GRAPH_LIST_SUCCESS,
            payload: points
        });

    } catch (e) {

        yield put({
            type: actionTypes.GET_GRAPH_LIST_ERROR,
            payload: null
        });

    }
}

// Саги графиков
function* graphSaga() {
    // Выбор графика после обновления списка
    yield takeLatest(actionTypes.GET_GRAPH_LIST_SUCCESS, selectDefaultGraph);

    // Получение точек графика после выбора графика
    yield takeLatest(actionTypes.SELECT_GRAPH_SUCCESS, getGraphPoints);

    // Обновление списка графиков после добавления графика
    yield takeLatest(actionTypes.ADD_GRAPH_SUCCESS, updateGraphList);

    // Обновление списка графиков после удаления графика
    yield takeLatest(actionTypes.DELETE_GRAPH_SUCCESS, updateGraphList);
}

export default graphSaga;