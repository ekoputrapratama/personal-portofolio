import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import theme from './theme'

const rootReducer = combineReducers({
  // theme,
  routing: routerReducer
});

export default rootReducer;
