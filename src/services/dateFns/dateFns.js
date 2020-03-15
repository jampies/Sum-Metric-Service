import differenceInSeconds from 'date-fns/differenceInSeconds';

const getCurrentDate = () => {
  return new Date();
};

export default {
  getCurrentDate,
  differenceInSeconds
};
