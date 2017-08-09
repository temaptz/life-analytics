import { createStore, applyMiddleware } from 'redux';
import Reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const logger = createLogger();

    const store = createStore(
        Reducers,
        initialState,
        applyMiddleware(thunk, logger)
    );

    return store
}