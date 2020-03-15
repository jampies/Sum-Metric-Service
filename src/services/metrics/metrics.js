import dateFns from '../dateFns/dateFns.js';

const metrics = {};

class Metric {
  constructor (value, date) {
    this.value = value;
    this.date = date;
  }

  isWithinRange () {
    return Math.abs(dateFns.differenceInSeconds(dateFns.getCurrentDate(), this.date)) <= 3600;
  }
}

export default {
  addMetric: (key, value) => {
    try {
      if (!metrics[key]) {
        metrics[key] = [];
      }

      metrics[key].push(new Metric(value, dateFns.getCurrentDate()));

      return true;
    } catch (e) {
      console.log('ERROR: ', e);
      return false;
    }
  },
  getSumOfMetrics: (key) => {
    if (!metrics[key]) {
      return 0;
    }
    metrics[key] = metrics[key].filter(m => m.isWithinRange());

    return metrics[key].reduce((total, metric) => {
      return total + metric.value;
    }, 0);
  }
};
