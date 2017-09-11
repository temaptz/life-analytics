import * as actionTypes from '../constants/ActionTypes';
import * as storage from '../constants/Storage';
import * as userApi from '../api/userApi';
import * as browswerStorage from '../helpers/browserStorage';

// Проверка авторизации пользователя
export function checkUserAuth() {
    return (dispatch) => {
        const userName  = browswerStorage.get(storage.USER_NAME);
        const userToken = browswerStorage.get(storage.USER_TOKEN);

        if ( userName !== null && userToken !== null ) {

            dispatch({
                type    : actionTypes.SIGN_IN_SUCCESS,
                payload : {
                    name  : userName,
                    token : userToken
                }
            });

        }
    }
}

// Авторизация
export function signIn(providerUserId, userName, provider) {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SIGN_IN_REQUEST,
            payload : null
        });


        userApi
            .signIn(providerUserId, userName, provider)
            .then((res) => {

                dispatch({
                    type    : actionTypes.SIGN_IN_SUCCESS,
                    payload : res
                });

            })
            .catch((err) => {

                dispatch({
                    type    : actionTypes.SIGN_IN_ERROR,
                    payload : err
                });

            });
    }

}

// Ошибка авторизации
export function signInError() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SIGN_IN_ERROR,
            payload : {}
        });
    }

}

// Выход из системы
export function signOut() {

    return (dispatch) => {
        dispatch({
            type    : actionTypes.SIGN_OUT,
            payload : null
        });
    }

}