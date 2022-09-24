import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {mockProvider} from 'stateManagement';
import useCountValue from './selectors';

describe('features > counter > useCountValue', () => {
  const value = 6;

  const Provider = mockProvider({
    initialState: {
      count: {
        value,
      },
    },
  });

  it('returns count value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useCountValue(), {
      wrapper: ({children}) => <Provider>{children}</Provider>,
    });
    expect(result.current).toBe(value);
  });
});
