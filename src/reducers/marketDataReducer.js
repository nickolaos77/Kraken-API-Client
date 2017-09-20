/* eslint-disable import/prefer-default-export */
import { REQUEST_MARKET_DATA, RECEIVE_MARKET_DATA, FAILED_TO_RECEIVE_MARKET_DATA } from '../actions/domainActions';

export default function posts(state = { isFetching: false, data: {}, errorMessage: '' }, action) {
  switch (action.type) {
    case REQUEST_MARKET_DATA:
      return Object.assign({}, state, { isFetching: true }); // action.payload;
    case FAILED_TO_RECEIVE_MARKET_DATA:
      return Object.assign({}, state, { isFetching: false, errorMessage: action.message });
    case RECEIVE_MARKET_DATA:
      return Object.assign({}, state, { isFetching: false, data: action.data });
    default:
      return state;
  }
}
