const generateRandomNumber = () => {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

const covertWeigth = (weight1, weight2, weight3, weight4, weight) => {
  switch (true) {
    case weight <= 500:
      console.log(weight);
      return Number(weight1);
    case weight <= 1000:
      return Number(weight2);
    case weight <= 2000:
      return Number(weight3);
    case weight > 2000:
      return Number(weight3) + (weight * Number(weight4)) / 500;
    default:
      break;
  }
};

module.exports = {
  generateRandomNumber,
  covertWeigth,
};
