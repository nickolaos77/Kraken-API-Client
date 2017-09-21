export const SUBMIT_BUY_ORDER = 'SUBMIT_BUY_ORDER';
export const SUBMIT_SELL_ORDER = 'SUBMIT_SELL_ORDER';
// order = {size, price}
export function submitBuyOrder(order) {
  return ({
    type: SUBMIT_BUY_ORDER,
    order,
  });
}

export function submitSellOrder(order) {
  return ({
    type: SUBMIT_SELL_ORDER,
    order,
  });
}
