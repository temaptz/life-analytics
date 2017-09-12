import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    id                : '',
    name              : '',
    unitName          : '',
    graphList         : [],
    fetching          : false,
    showAddGraphModal : false,
    unitList          : [
        {
            _id  : 0,
            name : 'руб'
        },
        {
            _id  : 1,
            name : 'кг'
        },
        {
            _id  : 2,
            name : 'раз'
        },
        {
            _id  : 3,
            name : 'час'
        }
    ]
};

export default function graphState(state = initialState, action) {
    switch (action.type) {

        // Получение списка графиков
        case actionTypes.GET_GRAPH_LIST_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.GET_GRAPH_LIST_SUCCESS:
            return { ...state, graphList: action.payload, fetching: false };

        case actionTypes.GET_GRAPH_LIST_ERROR:
            return { ...state, graphList: [], fetching: false };


        // Выбор графика (получение с сервера)
        case actionTypes.SELECT_GRAPH_REQUEST:
            return { ...state, id: undefined, fetching: true };

        case actionTypes.SELECT_GRAPH_SUCCESS:
            return { ...state, id: action.payload._id, name: action.payload.name, unitName: action.payload.unitId, fetching: false };

        case actionTypes.SELECT_GRAPH_ERROR:
            return { ...state, id: undefined, fetching: false };


        // Добавление графика
        case actionTypes.ADD_GRAPH_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.ADD_GRAPH_SUCCESS:
            return { ...state, fetching: false };

        case actionTypes.ADD_GRAPH_ERROR:
            return { ...state, fetching: false };


        // Удаление графика
        case actionTypes.DELETE_GRAPH_REQUEST:
            return { ...state, fetching: true };

        case actionTypes.DELETE_GRAPH_SUCCESS:
            return { ...state, fetching: false };

        case actionTypes.DELETE_GRAPH_ERROR:
            return { ...state, fetching: false };


        // Модальное окно добавления графика
        case actionTypes.SHOW_ADD_GRAPH_MODAL:
            return { ...state, showAddGraphModal: true };

        case actionTypes.HIDE_ADD_GRAPH_MODAL:
            return { ...state, showAddGraphModal: false };


        // Сброс состояния графиков
        case actionTypes.CLEAR_GRAPHS_STATE:
            return initialState;


        default:
            return state;
    }
}