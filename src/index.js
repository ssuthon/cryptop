import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers'
import rootSaga from './sagas';

import App from './App'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

ReactDOM.render( <Provider store={store}><App/></Provider> , document.getElementById('root'))