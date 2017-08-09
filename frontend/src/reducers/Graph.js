import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    id                : '',
    name              : '',
    unitName          : '&#8381;',
    graphList         : [],
    fetching          : false,
    showAddGraphModal : false
};

export default function graphState(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_GRAPH_LIST_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.GET_GRAPH_LIST_SUCCESS:
            return { ...state, graphList: action.payload, fetching: false };

        case actionTypes.GET_GRAPH_LIST_ERROR:
            return { ...state, graphList: [], fetching: false };

        case actionTypes.SELECT_GRAPH_REQUEST:
            return { ...state, id: undefined, fetching: true };

        case actionTypes.SELECT_GRAPH_SUCCESS:
            return { ...state, id: action.payload, fetching: false };

        case actionTypes.SELECT_GRAPH_ERROR:
            return { ...state, id: undefined, fetching: false };

        case actionTypes.ADD_GRAPH_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.ADD_GRAPH_SUCCESS:
            return { ...state, fetching: false };

        case actionTypes.ADD_GRAPH_ERROR:
            return { ...state, fetching: false };

        case actionTypes.SHOW_ADD_GRAPH_MODAL:
            return { ...state, showAddGraphModal: true };

        case actionTypes.HIDE_ADD_GRAPH_MODAL:
            return { ...state, showAddGraphModal: false };

        default:
            return state;
    }
}