import React from 'react';
import {render} from '@testing-library/react';
import {mockProvider} from 'stateManagement';
import App from './App';

describe('components > App', () => {
  const Provider = mockProvider({
    initialState: {
      count: {
        value: 6,
      },
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    },
  });

  it('renders without crashing', () => {
    /**
     * `asFragment`:
     * @see https://testing-library.com/docs/react-testing-library/api#asfragment
     * `wrapper`
     * @see https://testing-library.com/docs/react-testing-library/api#wrapper
     */
    const {asFragment} = render(<App />, {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    /**
     * Basic snapshot test to make sure, that rendered component
     * matches expected footprint.
     */
    expect(asFragment()).toMatchSnapshot();
  });
});
