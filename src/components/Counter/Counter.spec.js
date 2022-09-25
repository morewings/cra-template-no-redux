import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {mockProvider} from 'stateManagement';
import Counter from './Counter';

const enhancer = jest.fn();

describe('components > Counter', () => {
  /** Create mock store with the count value */
  const initialState = {
    count: {
      value: 6,
    },
  };

  const Provider = mockProvider({
    initialState,
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

  it('renders without crashing', () => {
    /**
     * `asFragment`:
     * @see https://testing-library.com/docs/react-testing-library/api#asfragment
     * `qetByText`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#bytext
     * `wrapper`
     * @see https://testing-library.com/docs/react-testing-library/api#wrapper
     */
    const {asFragment, container} = render(<Counter />, {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    /**
     * Basic snapshot test to make sure, that rendered component
     * matches expected footprint.
     */
    expect(asFragment()).toMatchSnapshot();

    /** More precise test for counter value */
    expect(container.querySelector('strong')).toHaveTextContent(
      String(initialState.count.value)
    );
  });

  it('dispatches an action on button click', async () => {
    /**
     * `getByRole`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
     */
    const {getByRole} = render(<Counter />, {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    /**
     * Search for the button and make testing library click on it
     * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
     */
    fireEvent.click(getByRole('button'));

    /** enhancer should be run twice */
    await waitFor(() => {
      expect(enhancer).toHaveBeenCalledTimes(2);
    });

    /** state should be updated properly */
    expect(enhancer.mock.calls[1][0].state).toEqual({
      count: {
        value: initialState.count.value + 1,
      },
    });
  });
});
