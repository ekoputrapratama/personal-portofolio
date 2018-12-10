import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

import rootReducer from '../reducers';
import { firebaseConfig, reduxFirebase as reduxConfig } from '../config';

// Initialize firebase instance
if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export const history = createHashHistory();
const initialState = {};
const enhancers = [];
const middleware = [];

// Thunk Middleware
middleware.push(thunk.withExtraArgument(getFirebase));

// Logging Middleware
const logger = createLogger({
  level: 'info',
  collapsed: true
});
middleware.push(logger);

// Router Middleware
const router = routerMiddleware(history);
middleware.push(router);

// Redux DevTools Configuration
const actionCreators = {
  ...routerActions
};
// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    })
  : compose;

// Apply Middleware & Compose Enhancers
enhancers.push(applyMiddleware(...middleware));
const enhancer = composeEnhancers(...enhancers);
// Add redux Firebase to compose
const createStoreWithFirebase = composeEnhancers(
  reactReduxFirebase(firebase, reduxConfig),
  reduxFirestore(firebase, reduxConfig)
)(createStore);
// Create Store
export const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  enhancer
);
