const generateRandomNumber = () => {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

const covertWeigth = (weight) => {
  switch (true) {
    case weight <= 500:
      return 5000;
    case weight <= 1000:
      return 12000;
    case weight <= 2000:
      return 25000;
    case weight > 2000:
      return 25000 + (weight * 2000) / 500;
    default:
      break;
  }
};

module.exports = {
  generateRandomNumber,
  covertWeigth,
};
