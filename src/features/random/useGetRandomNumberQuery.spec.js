import React from 'react';
import axios from 'axios';
import {waitFor} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import {mockProvider} from 'stateManagement';
import useGetRandomNumberQuery from './useGetRandomNumberQuery';

jest.mock('axios');
const enhancer = jest.fn();

describe('features > counter > useGetRandomNumberQuery', () => {
  const Provider = mockProvider({
    initialState: {
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    },
    enhancers: [enhancer],
  });

  it('returns function', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useGetRandomNumberQuery(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    expect(result.current).toBeInstanceOf(Function);
  });

  describe('gets number', () => {
    afterEach(() => {
      enhancer.mockClear();
    });

    /** Note that tests functions are async */
    it(`handles successful API query`, async () => {
      const {result} = renderHook(() => useGetRandomNumberQuery(), {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /** Mock response from API */
      const response = 6;

      /**
       * Mock axios successful response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

      act(() => {
        result.current();
      });

      await waitFor(() => {
        expect(enhancer).toBeCalledTimes(2);
      });

      expect(enhancer.mock.calls[1][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: true,
        number: undefined,
      });

      await waitFor(() => {
        expect(enhancer).toBeCalledTimes(3);
      });

      expect(enhancer.mock.calls[2][0].state.random).toEqual({
        hasError: false,
        isFulfilled: true,
        isLoading: false,
        number: response,
      });
    });

    it(`handles rejected API query`, async () => {
      const {result} = renderHook(() => useGetRandomNumberQuery(), {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /**
       * Mock axios rejected response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

      /**
       * Wait until async action finishes
       */
      act(() => {
        result.current();
      });

      await waitFor(() => {
        expect(enhancer).toBeCalledTimes(2);
      });

      expect(enhancer.mock.calls[1][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: true,
        number: undefined,
      });

      await waitFor(() => {
        expect(enhancer).toBeCalledTimes(3);
      });

      expect(enhancer.mock.calls[2][0].state.random).toEqual({
        hasError: true,
        isFulfilled: false,
        isLoading: false,
        number: undefined,
      });
    });
  });
});
