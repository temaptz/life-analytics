import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    name       : '',
    token      : '',
    authorized : false
};

export default function userState(state = initialState, action) {
    switch (action.type) {

        // Авторизация
        case actionTypes.SIGN_IN_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.SIGN_IN_SUCCESS:
            return { ...state, name: action.payload.name, token: action.payload.token, authorized: true, fetching: false };

        case actionTypes.SIGN_IN_ERROR:
            return { ...state, authorized: false, fetching: false };


        // Выход
        case actionTypes.SIGN_OUT:
            return initialState;


        default:
            return state;
    }
}