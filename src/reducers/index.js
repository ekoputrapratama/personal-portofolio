import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import scrollTo from './scroll';

const rootReducer = combineReducers({
  // theme,
  scroll: scrollTo,
  routing: routerReducer
});

export default rootReducer;
