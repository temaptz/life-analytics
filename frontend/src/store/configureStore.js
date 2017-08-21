import { createStore, applyMiddleware } from 'redux';
import Reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import graphSaga from '../saga/graphSaga';
import pointsSaga from '../saga/pointsSaga';

export default function configureStore(initialState) {

    const sagaMiddleware = createSagaMiddleware();

    const logger = createLogger();

    const store = createStore(
        Reducers,
        initialState,
        applyMiddleware(thunk, sagaMiddleware, logger)
    );

    sagaMiddleware.run(graphSaga);
    sagaMiddleware.run(pointsSaga);

    return store
}