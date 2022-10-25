const parseCommodityArr = (arr, orderCode) => {
  return arr.map((item) => {
    return {
      orderCode: orderCode,
      ...item,
    };
  });
};

module.exports = {
  parseCommodityArr,
};
