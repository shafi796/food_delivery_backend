const findTotal = (carts = [], additional = 0) =>
  carts?.length
    ? carts
        ?.map((cart) => cart?.food?.price * cart?.count)
        .reduce((a, b) => parseFloat(a) + parseFloat(b)) + additional
    : 0;

module.exports = { findTotal };
