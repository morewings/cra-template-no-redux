import React from 'react';
import {mockProvider} from 'stateManagement';
import {renderHook} from '@testing-library/react-hooks';
import {useRandomNumber, useLoadingState} from './selectors';

describe('features > counter > useRandomNumber', () => {
  const random = 42;
  const Provider = mockProvider({
    initialState: {
      random: {
        number: random,
      },
    },
  });
  it('returns count value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useRandomNumber(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    expect(result.current).toBe(random);
  });
});

describe('features > counter > useLoadingState', () => {
  const initialState = {
    random: {
      isLoading: true,
      hasError: true,
      isFulfilled: true,
    },
  };

  const Provider = mockProvider({
    initialState,
  });

  it('returns loading state info', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useLoadingState(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });

    expect(result.current).toMatchObject(initialState.random);
  });
});
