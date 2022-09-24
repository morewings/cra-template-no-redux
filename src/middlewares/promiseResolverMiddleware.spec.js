import {waitFor} from '@testing-library/react';
import {promiseResolverMiddleware} from './promiseResolverMiddleware';

const dispatch = jest.fn();

describe('promiseResolverMiddleware', () => {
  afterEach(() => {
    dispatch.mockReset();
  });

  it('passes through non-Promise actions', () => {
    const action = {
      type: 'FOO',
    };
    expect(promiseResolverMiddleware(dispatch)(action)).toBe(action);
  });

  it('dispatches _PENDING action when given Promise', () => {
    const action = {
      type: 'FOO',
      payload: Promise.resolve(),
    };
    promiseResolverMiddleware(dispatch)(action);
    expect(promiseResolverMiddleware(dispatch)(action)).toEqual({
      type: `${action.type}_PENDING`,
    });
  });

  it('handles successful response', async () => {
    const response = 'foo';
    const action = {
      type: 'FOO',
      payload: Promise.resolve(response),
    };
    promiseResolverMiddleware(dispatch)(action);
    /**
     * Use waitFor here to wait until Promise resolved.
     * @see https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
     */
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: `${action.type}_FULFILLED`,
        payload: response,
      });
    });
  });

  it('handles rejection', async () => {
    const action = {
      type: 'FOO',
      payload: Promise.reject(),
    };
    promiseResolverMiddleware(dispatch)(action);
    /**
     * Use waitFor here to wait until Promise rejected.
     * @see https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
     */
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: `${action.type}_REJECTED`,
      });
    });
  });
});
