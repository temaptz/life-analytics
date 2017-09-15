import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    list     : [],
    fetching : false,
    name     : ''
};

export default function graphState(state = initialState, action) {
    switch (action.type) {

        // Получение списка единиц измерения
        case actionTypes.GET_UNIT_LIST_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.GET_UNIT_LIST_SUCCESS:
            return { ...state, list: action.payload, fetching: false };

        case actionTypes.GET_UNIT_LIST_ERROR:
            return { ...state, list: [], fetching: false };


        // Получение единицы измерения
        case actionTypes.GET_UNIT_REQUEST:
            return { ...state, name: '', fetching: true };

        case actionTypes.GET_UNIT_SUCCESS:
            return { ...state, name: action.payload.name, fetching: false };

        case actionTypes.GET_UNIT_ERROR:
            return { ...state, name: '', fetching: false };


        // Сброс состояния единиц измерения
        case actionTypes.CLEAR_UNITS_STATE:
            return initialState;


        default:
            return state;
    }
}