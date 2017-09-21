import { combineReducers } from 'redux';
import appState from './marketDataReducer';

const rootReducer = combineReducers({
  appState,
});

export default rootReducer;
