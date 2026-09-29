'use strict';
const assert = require('assert');

const RequestLimiter = require('../index');

const context = {
  plugins: [],
  req: {
    _queries: {},
    _headers: {
      'User-Agent': 'http-transport/1.0.0'
    },
    _method: 'GET',
    _url: 'https://jsonplaceholder.typicode.com/posts/1'
  },
  res: {
    elapsedTime: 0,
    headers: {}
  }
};

const makeNext = (spy) => {
  return () => {
    return new Promise((resolve) => {
      spy();
      resolve();
    });
  };
};

describe('Simple Rate Limiter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a promise', (done) => {
    const requestLimiter = RequestLimiter(10, 100);
    const next1 = makeNext(() => { });

    requestLimiter(context, next1).then(() => {
      done();
    });

    jest.advanceTimersByTime(1);
  });

  it('limits requests', (done) => {
    const requestLimiter = RequestLimiter(1, 10000);

    const spy1 = jest.fn();
    const spy2 = jest.fn();
    requestLimiter(context, makeNext(spy1));
    requestLimiter(context, makeNext(spy2));

    jest.advanceTimersByTime(1);
    assert.ok(spy1.mock.calls.length > 0);
    assert.strictEqual(spy2.mock.calls.length, 0);

    jest.advanceTimersByTime(9998);
    assert.strictEqual(spy2.mock.calls.length, 0);

    jest.advanceTimersByTime(1);
    assert.ok(spy2.mock.calls.length > 0);
    done();
  });
});
