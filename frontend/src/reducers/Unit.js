import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    list     : [],
    fetching : false
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


        // Сброс состояния единиц измерения
        case actionTypes.CLEAR_UNITS_STATE:
            return initialState;


        default:
            return state;
    }
}