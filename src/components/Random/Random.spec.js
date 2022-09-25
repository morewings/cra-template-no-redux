import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';
import {initialState} from 'features/random';
import {mockProvider} from 'stateManagement';
import Random from './Random';

jest.mock('axios');

const enhancer = jest.fn();

/* We use these strings to match HTMLElements */
const pristineText = 'Click the button to get random number';
const loadingText = 'Getting number';
const errorText = 'Ups...';
const response = 6;

describe('components > Random', () => {
  beforeEach(() => {
    enhancer.mockClear();
  });

  /**
   * Provide table of values to run tests with
   * @see https://jestjs.io/docs/en/api#describeeachtablename-fn-timeout
   */
  describe.each`
    isLoading | hasError | isFulfilled
    ${false}  | ${false} | ${false}
    ${true}   | ${false} | ${false}
    ${false}  | ${true}  | ${false}
    ${false}  | ${false} | ${true}
  `('renders different store states', ({isLoading, hasError, isFulfilled}) => {
    it(`when isLoading === ${isLoading} && hasError === ${hasError} && isFulfilled === ${isFulfilled}`, () => {
      const Provider = mockProvider({
        initialState: {
          random: {
            isLoading,
            hasError,
            isFulfilled,
            number: isFulfilled ? 1 : undefined,
          },
        },
      });

      /**
       * `asFragment`:
       * @see https://testing-library.com/docs/react-testing-library/api#asfragment
       * `wrapper`:
       * @see https://testing-library.com/docs/react-testing-library/api#wrapper
       */
      const {asFragment} = render(<Random />, {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /**
       * Basic snapshot test to check, if rendered component
       * matches expected footprint.
       */
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('request info', () => {
    const Provider = mockProvider({
      initialState: {
        random: initialState,
      },
    });
    it('handles successful', async () => {
      /**
       * Mock axios successful response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

      /**
       * `getByRole`:
       * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
       */
      const {asFragment, getByRole} = render(<Random />, {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /**
       * Search for the button and make testing library click on it
       * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
       */
      fireEvent.click(getByRole('button'));

      /** Check that initial message has changed to loading. */
      expect(asFragment()).toMatchSnapshot();
      expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
      expect(screen.queryByText(loadingText)).toBeInTheDocument();

      /** Check that loading message has changed to success. */
      await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
      expect(asFragment()).toMatchSnapshot();
      expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(response)).toBeInTheDocument();
    });

    it('handles rejected', async () => {
      /**
       * Mock axios rejected response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

      /**
       * `getByRole`:
       * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
       */
      const {asFragment, getByRole} = render(<Random />, {
        wrapper: ({children}) => (
          /* We use real store here, to get action through */
          <Provider>{children}</Provider>
        ),
      });

      /**
       * Search for the button and make testing library click on it
       * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
       */
      fireEvent.click(getByRole('button'));

      /** Check that initial message has changed to loading. */
      expect(asFragment()).toMatchSnapshot();
      expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
      expect(screen.queryByText(loadingText)).toBeInTheDocument();

      /** Check that loading message has changed to error. */
      await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
      expect(asFragment()).toMatchSnapshot();
      expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(errorText)).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('dispatches an action sequence on successful request made', async () => {
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

      /**
       * Mock axios successful response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

      /**
       * `getByRole`:
       * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
       */
      const {getByRole} = render(<Random />, {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /**
       * Search for the button and make testing library click on it
       * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
       */
      fireEvent.click(getByRole('button'));

      /* Assert two initial state changes. 1st on component load, 2nd when loading process started */
      expect(enhancer).toHaveBeenCalledTimes(2);
      expect(enhancer.mock.calls[0][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: false,
      });

      expect(enhancer.mock.calls[1][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: true,
      });

      /* Assert two initial calls. 1st on component load, 2nd when loading process started */
      await waitFor(() => {
        expect(enhancer).toHaveBeenCalledTimes(3);
      });

      /* Assert 3rd state change, when response delivered */
      expect(enhancer.mock.calls[2][0].state.random).toEqual({
        hasError: false,
        isFulfilled: true,
        isLoading: false,
        number: 6,
      });
    });

    it('dispatches an action sequence on rejected request made', async () => {
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

      /**
       * Mock axios rejected response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

      /**
       * `getByRole`:
       * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
       */
      const {getByRole} = render(<Random />, {
        wrapper: ({children}) => <Provider>{children}</Provider>,
      });

      /**
       * Search for the button and make testing library click on it
       * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
       */
      fireEvent.click(getByRole('button'));

      /* Assert two initial state changes. 1st on component load, 2nd when loading process started */
      expect(enhancer).toHaveBeenCalledTimes(2);
      expect(enhancer.mock.calls[0][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: false,
      });

      expect(enhancer.mock.calls[1][0].state.random).toEqual({
        hasError: false,
        isFulfilled: false,
        isLoading: true,
      });

      /* Assert two initial calls. 1st on component load, 2nd when loading process started */
      await waitFor(() => {
        expect(enhancer).toHaveBeenCalledTimes(3);
      });

      /* Assert 3rd state change, when response delivered */
      expect(enhancer.mock.calls[2][0].state.random).toEqual({
        hasError: true,
        isFulfilled: false,
        isLoading: false,
      });
    });
  });
});
