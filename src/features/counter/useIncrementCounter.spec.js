import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {waitFor} from '@testing-library/react';
import {mockProvider} from 'stateManagement';
import useIncrementCounter from './useIncrementCounter';

const enhancer = jest.fn();

describe('features > counter > useIncrementCounter', () => {
  /** Create mock store with the count value */
  const value = 6;
  const Provider = mockProvider({
    initialState: {
      count: {
        value,
      },
    },
    enhancers: [enhancer],
  });

  /**
   * Jest hook which runs before each test,
   * @see https://jestjs.io/docs/en/api#beforeeachfn-timeout
   */
  beforeEach(() => {
    /**
     * Clear any saved mock data from previous tests,
     * because jest saves calls data for spies and mocks.
     * @see https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
     */
    enhancer.mockClear();
  });

  it('returns function', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useIncrementCounter(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    expect(result.current).toBeInstanceOf(Function);
    /** enhancer should be run once */
    expect(enhancer).toHaveBeenCalledTimes(1);
  });

  it('increments counter value by 1', async () => {
    const {result} = renderHook(() => useIncrementCounter(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    result.current();

    /** enhancer should be run twice */
    await waitFor(() => {
      expect(enhancer).toHaveBeenCalledTimes(2);
    });

    /** state should be updated properly */
    expect(enhancer.mock.calls[1][0].state).toEqual({
      count: {
        value: value + 1,
      },
    });
  });
});
