import { combineReducers } from 'redux';
import marketData from './marketDataReducer';

const rootReducer = combineReducers({
  marketData,
});

export default rootReducer;
