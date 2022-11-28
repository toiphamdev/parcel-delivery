const parseCommodityArr = (arr, orderCode, senderEmail, orderKey) => {
  return arr.map((item) => {
    return {
      orderCode: orderCode,
      senderEmail: senderEmail,
      orderKey: orderKey,
      ...item,
    };
  });
};

module.exports = {
  parseCommodityArr,
};
