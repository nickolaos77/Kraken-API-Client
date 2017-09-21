// https://engineering.thetrainline.com/handling-api-calls-in-redux-with-redux-api-middleware-c95c38816e13
// the structure of the reducers follows the example from the react-redux documentation:
// http://redux.js.org/docs/advanced/AsyncActions.html
import fetch from 'isomorphic-fetch';

export const REQUEST_MARKET_DATA = 'REQUEST_MARKET_DATA';
export const RECEIVE_MARKET_DATA = 'RECEIVE_MARKET_DATA';
export const FAILED_TO_RECEIVE_MARKET_DATA = 'FAILED_TO_RECEIVE_MARKET_DATA';

export function requestMarketData() { return ({ type: REQUEST_MARKET_DATA }); }

export function receiveMarketData(json) {
  return ({
    type: RECEIVE_MARKET_DATA,
    data: json.result.XXBTZUSD,
  });
}

export function failedToReceiveMarketData(message) {
  return ({
    type: FAILED_TO_RECEIVE_MARKET_DATA,
    message,
  });
}
//  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
export function fetchMarketData() {
  return function dispatcher(dispatch) {
    dispatch(requestMarketData());
    return fetch('https://galvanize-cors-proxy.herokuapp.com/' + 'https://api.kraken.com/0/public/Depth?pair=XBTUSD')
      .then((response) => {
        if (response.status >= 400) {
          dispatch(failedToReceiveMarketData('Bad response from server'));
        }
        return response.json();
      })
      .then(json =>
        dispatch(receiveMarketData(json)));
  };
}
