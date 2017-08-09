import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    pointsData : [],
    value      : '',
    fetching   : false
};

export default function pointState(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_POINTS_REQUEST:
            return { ...state, pointsData: [], fetching: true };

        case actionTypes.GET_POINTS_SUCCESS:
            return { ...state, pointsData: action.payload, fetching: false };

        case actionTypes.GET_POINTS_ERROR:
            return { ...state, pointsData: [], fetching: false };

        case actionTypes.ADD_POINT_REQUEST:
            return { ...state, value: action.payload, fetching: true };

        case actionTypes.ADD_POINT_SUCCESS:
            return { ...state, value: '', fetching: false };

        case actionTypes.ADD_POINT_ERROR:
            return { ...state, value: action.payload, fetching: false };

        default:
            return state;
    }
}