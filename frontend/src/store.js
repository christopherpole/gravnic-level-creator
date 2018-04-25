import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;
/* eslint-enable no-underscore-dangle */

const middleware = applyMiddleware(thunk, sagaMiddleware);

export default createStore(reducers, composeEnhancers(middleware));
sagaMiddleware.run(rootSaga);
