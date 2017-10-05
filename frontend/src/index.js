import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import './style/index.css';

const store = configureStore();


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);