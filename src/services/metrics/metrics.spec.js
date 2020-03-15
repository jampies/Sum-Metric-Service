import assert from 'assert';
import td from 'testdouble';
import dateFns from '../dateFns/dateFns';

describe('metrics', () => {
  let mockDateFns;
  let metrics;

  beforeEach(() => {
    mockDateFns = td.replace('../dateFns/dateFns.js', {
      getCurrentDate: td.func('mockGetCurrentDate'),
      differenceInSeconds: dateFns.differenceInSeconds
    });
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date());
    metrics = require('./metrics').default;
  });

  afterEach(() => {
    td.reset();
  });

  it('should add metrics and return the sum', () => {
    metrics.addMetric('foo', 2);
    metrics.addMetric('foo', 5);
    metrics.addMetric('foo', 3);
    assert.deepStrictEqual(metrics.getSumOfMetrics('foo'), 10);
  });

  it('should not include metrics added on a different key', () => {
    metrics.addMetric('foo', 2);
    metrics.addMetric('bar', 4);
    metrics.addMetric('foo', 3);
    assert.deepStrictEqual(metrics.getSumOfMetrics('foo'), 5);
  });

  it('should not include metrics added more than an hour ago', () => {
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 10, 0, 0, 0));
    metrics.addMetric('foo', 4);
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 11, 30, 0, 0));
    metrics.addMetric('foo', 3);
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 11, 59, 20, 0));
    metrics.addMetric('foo', 7);
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 11, 59, 55, 0));
    metrics.addMetric('foo', 2);
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 12, 0, 0, 0));
    assert.deepStrictEqual(metrics.getSumOfMetrics('foo'), 12);
  });

  it('should handle invalid keys', () => {
    assert.deepStrictEqual(metrics.getSumOfMetrics('jasnsjfb'), 0);
  })

  it('should handle a large amount of requests', () => {
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 10, 0, 0, 0));
    for (let i = 0; i < 1000; i++) {
      metrics.addMetric('foo', 4);
    }
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 11, 59, 55, 0));
    for (let i = 0; i < 10000; i++) {
      metrics.addMetric('foo', 2);
    }
    td.when(mockDateFns.getCurrentDate()).thenReturn(new Date(2018, 6, 10, 12, 0, 0, 0));
    assert.deepStrictEqual(metrics.getSumOfMetrics('foo'), 20000);
  })
});
