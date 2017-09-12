import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    points             : [],
    fetching           : false,
    addingPointSuccess : true,
};

export default function pointState(state = initialState, action) {
    switch (action.type) {

        // Получение точек
        case actionTypes.GET_POINTS_REQUEST:
            return { ...state, points: [], fetching: true };

        case actionTypes.GET_POINTS_SUCCESS:
            return { ...state, points: action.payload, fetching: false };

        case actionTypes.GET_POINTS_ERROR:
            return { ...state, points: [], fetching: false };


        // Добавление точки
        case actionTypes.ADD_POINT_REQUEST:
            return { ...state, addingPointSuccess: false, fetching: true };

        case actionTypes.ADD_POINT_SUCCESS:
            return { ...state, addingPointSuccess: true, fetching: false };

        case actionTypes.ADD_POINT_ERROR:
            return { ...state, addingPointSuccess: false, fetching: false };


        // Сброс состояния точек
        case actionTypes.CLEAR_POINTS_STATE:
            return initialState;


        default:
            return state;
    }
}