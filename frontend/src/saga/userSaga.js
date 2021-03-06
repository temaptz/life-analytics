import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';
import * as graphApi from '../api/graphApi';
import * as unitApi from '../api/unitApi';

// Сохранение пользователских данных в браузере после авторизации
function* saveUserData() {
    try {

        const state = yield select();

        yield browserStorage.set(storage.USER_NAME, state.User.name);

        yield browserStorage.set(storage.USER_TOKEN, state.User.token);

    } catch (e) {

        yield window.location.reload();

    }
}

// Загрузка доступных графиков после авторизации
function* updateGraphList() {
    try {

        yield put({
            type    : actionTypes.GET_GRAPH_LIST_REQUEST,
            payload : null
        });

        const graphList = yield call(graphApi.getGraphList);

        yield put({
            type    : actionTypes.GET_GRAPH_LIST_SUCCESS,
            payload : graphList
        });

    } catch (e) {

        yield put({
            type    : actionTypes.GET_GRAPH_LIST_ERROR,
            payload : null
        });

    }
}

// Загрузка единиц измерения после авторизации
function* updateUnitList() {
    try {

        yield put({
            type    : actionTypes.GET_UNIT_LIST_REQUEST,
            payload : null
        });

        const unitList = yield call(unitApi.getUnitList);

        yield put({
            type    : actionTypes.GET_UNIT_LIST_SUCCESS,
            payload : unitList
        });

    } catch (e) {

        yield put({
            type    : actionTypes.GET_UNIT_LIST_ERROR,
            payload : null
        });

    }
}

// Удаление пользовательских данных из браузера при выходе из системы
function* removeUserData() {
    try {

        yield browserStorage.remove(storage.USER_NAME);

        yield browserStorage.remove(storage.USER_TOKEN);

    } catch (e) {

        yield browserStorage.removeAll();

    }
}

// Сброс состояния при выходе из системы
function* clearState() {
    try {

        yield put({
            type: actionTypes.CLEAR_GRAPHS_STATE,
            payload: null
        });

        yield put({
            type: actionTypes.CLEAR_UNITS_STATE,
            payload: null
        });

        yield put({
            type: actionTypes.CLEAR_POINTS_STATE,
            payload: null
        });

    } catch (e) {

        yield window.location.reload();

    }
}


// Саги пользователя
function* userSaga() {
    // Сохранение пользовательских данных в браузере после авторизации
    yield takeLatest(actionTypes.SIGN_IN_SUCCESS, saveUserData);

    // Загрузка доступных графиков после авторизации
    yield takeLatest(actionTypes.SIGN_IN_SUCCESS, updateGraphList);

    // Загрузка единиц измерения после авторизации
    yield takeLatest(actionTypes.SIGN_IN_SUCCESS, updateUnitList);

    // Удаление пользовательских данных из браузера при выходе из системы
    yield takeLatest(actionTypes.SIGN_OUT, removeUserData);

    // Сброс состояния при выходе из системы
    yield takeLatest(actionTypes.SIGN_OUT, clearState);
}

export default userSaga;