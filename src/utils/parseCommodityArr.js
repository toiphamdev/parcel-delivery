const parseCommodityArr = (arr, orderCode, senderEmail) => {
  return arr.map((item) => {
    return {
      orderCode: orderCode,
      senderEmail: senderEmail,
      ...item,
    };
  });
};

module.exports = {
  parseCommodityArr,
};
