import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as pointsApi from '../api/pointsApi';

// Получение точек графика после выбора графика
function* updateGraphPoints(action) {
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

// Саги точек
function* pointsSaga() {
    // Обновление графика после добавления точки
    yield takeLatest(actionTypes.ADD_POINT_SUCCESS, updateGraphPoints);
}

export default pointsSaga;