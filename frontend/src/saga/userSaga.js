import { takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';

// Сохранение пользователских данных в браузере после авторизации
function* saveUserData(action) {
    try {

        const state = yield select();

        yield browserStorage.set(storage.USER_NAME, state.User.name);

        yield browserStorage.set(storage.USER_TOKEN, state.User.token);

    } catch (e) {

        yield browserStorage.remove(storage.USER_NAME);

        yield browserStorage.remove(storage.USER_TOKEN);

    }
}

// Удаление пользовательских данных из браузера после выхода из системы
function* removeUserData(action) {
    try {

        yield browserStorage.remove(storage.USER_NAME);

        yield browserStorage.remove(storage.USER_TOKEN);

    } catch (e) {

        yield browserStorage.removeAll();

    }
}

// Саги пользователя
function* userSaga() {
    // Сохранение пользовательских данных в браузере после авторизации
    yield takeLatest(actionTypes.SIGN_IN_SUCCESS, saveUserData);

    // Удаление пользовательских данных из браузера после выхода из системы
    yield takeLatest(actionTypes.SIGN_OUT_SUCCESS, removeUserData);
}

export default userSaga;