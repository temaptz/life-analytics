import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as storage from '../constants/Storage';
import * as graphApi from '../api/graphApi';
import * as pointsApi from '../api/pointsApi';
import * as unitApi from '../api/unitApi';
import { getTimeLimitsByPeriodName } from '../helpers/timePeriod';
import { set } from '../helpers/browserStorage';

// Выбор текущего графика после обновлении списка графиков
function* selectDefaultGraph() {
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

        yield put({
            type: actionTypes.SELECT_GRAPH_REQUEST,
            payload: null
        });

        const graph = yield call(graphApi.getGraph, selectedGraphId);

        yield put({
            type: actionTypes.SELECT_GRAPH_SUCCESS,
            payload: graph
        });

    } catch (e) {

        yield put({
            type: actionTypes.SELECT_GRAPH_ERROR,
            payload: null
        });

    }
}

// Выбор временного периода после выбора графика
function* setGraphPeriod() {
    try {

        const state = yield select();

        const currentPeriodName = state.Graph.periodName;

        yield put({
            type: actionTypes.SET_GRAPH_PERIOD,
            payload: { name : currentPeriodName }
        });

    } catch (e) {

        yield window.location.reload();

    }
}

// Сохранение графика после обновления списка графиков
export function* saveCurrentGraph() {
    try {

        const state = yield select();

        yield set(storage.CURRENT_GRAPH_ID, state.Graph.id);

    } catch (e) {

        console.log(e);

    }
}

// Обновление точек графика после изменения временного периода
export function* getGraphPoints() {
    try {

        const state = yield select();

        yield put({
            type: actionTypes.GET_POINTS_REQUEST,
            payload: null
        });

        const timeLimits = getTimeLimitsByPeriodName(state.Graph.periodName);
        let from = ( timeLimits.noLimit ) ? null : timeLimits.from,
            to   = ( timeLimits.noLimit ) ? null : timeLimits.to;

        const points = yield call(pointsApi.getGraphPoints, state.Graph.id, from, to);

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

// Сохранение периода графика после изменения временного периода
export function* saveGraphCurrentPeriod() {
    try {

        const state = yield select();

        yield set(storage.CURRENT_TIME_PERIOD, state.Graph.periodName);

    } catch (e) {

        console.log(e);

    }
}

// Получение единицы измерени графика после выбора графика
function* getGraphUnitName() {
    try {

        const state = yield select();

        yield put({
            type: actionTypes.GET_UNIT_REQUEST,
            payload: null
        });

        const unit = yield call(unitApi.getUnit, state.Graph.unitId);

        yield put({
            type: actionTypes.GET_UNIT_SUCCESS,
            payload: unit
        });

    } catch (e) {

        yield put({
            type: actionTypes.GET_UNIT_ERROR,
            payload: null
        });

    }
}

// Обновление списка графиков после добавления или удаления графика
function* updateGraphList() {
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

    // Выбор временного периода после выбора графика
    yield takeLatest(actionTypes.SELECT_GRAPH_SUCCESS, setGraphPeriod);

    // Сохранение выбранного графика после выбора графика
    yield takeLatest(actionTypes.SELECT_GRAPH_SUCCESS, saveCurrentGraph);

    // Получение точек графика после изменения временного периода
    yield takeLatest(actionTypes.SET_GRAPH_PERIOD, getGraphPoints);

    // Сохранение выбранного периода графика после изменения временного периода
    yield takeLatest(actionTypes.SET_GRAPH_PERIOD, saveGraphCurrentPeriod);

    // Получение единицы измерени графика после выбора графика
    yield takeLatest(actionTypes.SELECT_GRAPH_SUCCESS, getGraphUnitName);

    // Обновление списка графиков после добавления графика
    yield takeLatest(actionTypes.ADD_GRAPH_SUCCESS, updateGraphList);

    // Обновление списка графиков после удаления графика
    yield takeLatest(actionTypes.DELETE_GRAPH_SUCCESS, updateGraphList);
}

export default graphSaga;