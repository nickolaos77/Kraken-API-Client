/* eslint-disable import/prefer-default-export */
import { REQUEST_MARKET_DATA, RECEIVE_MARKET_DATA, FAILED_TO_RECEIVE_MARKET_DATA } from '../actions/domainActions';
import { SUBMIT_BUY_ORDER, SUBMIT_SELL_ORDER } from '../actions/userActions';

export default function posts(state = { isFetching: false, data: {}, errorMessage: '' }, action) {
  switch (action.type) {
    case REQUEST_MARKET_DATA:
      return Object.assign({}, state, { isFetching: true });
    case FAILED_TO_RECEIVE_MARKET_DATA:
      return Object.assign({}, state, { isFetching: false, errorMessage: action.message });
    case RECEIVE_MARKET_DATA: {
      const newAsks = action.data.asks.slice();
      newAsks.reverse();
      const newData = { asks: newAsks, bids: action.data.bids };
      return Object.assign({}, state, { isFetching: false, data: newData });
    }
    case SUBMIT_SELL_ORDER: {
      // when a sell order is submitted it is inserted it the array of the ask prices
      let newAsks = [...state.data.asks];
      const len = newAsks.length;
      for (let index = 0; index < len; index += 1) {
        if (+newAsks[index][0] < action.order.price) {
          newAsks = [...newAsks.slice(0, index),
            [action.order.price.toString(), action.order.size.toString()],
            ...newAsks.slice(index)];
          break;
        }
      }
      const newData = { asks: newAsks, bids: state.data.bids };
      return Object.assign({}, state, { data: newData });
    }
    case SUBMIT_BUY_ORDER: {
      // when a buy order is submitted it is inserted it the array of the ask prices
      let newBids = [...state.data.bids];
      const len = newBids.length;
      for (let index = 0; index < len; index += 1) {
        if (+newBids[index][0] < action.order.price) {
          newBids = [...newBids.slice(0, index),
            [action.order.price.toString(), action.order.size.toString()],
            ...newBids.slice(index)];
          break;
        }
      }
      const newData = { asks: state.data.asks, bids: newBids };
      return Object.assign({}, state, { data: newData });
    }
    default:
      return state;
  }
}
