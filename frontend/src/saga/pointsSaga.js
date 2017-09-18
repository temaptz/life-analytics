import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import { getGraphPoints } from './graphSaga';

// Саги точек
function* pointsSaga() {
    // Обновление точек графика после добавления точки
    yield takeLatest(actionTypes.ADD_POINT_SUCCESS, getGraphPoints);
}

export default pointsSaga;