import React, {useMemo} from 'react';
import {useReducer} from 'utils/useReducer';
import {promiseResolverMiddleware} from 'middlewares/promiseResolverMiddleware';

export const createStoreProvider =
  ({initialState, reducer, context}) =>
  WrappedComponent =>
  props => {
    const {Provider} = context;
    const [state, dispatch] = useReducer(reducer, initialState, [
      promiseResolverMiddleware,
    ]);
    // Important(!): memoize array value. Else all context consumers update on *every* render
    const store = useMemo(() => ({state, dispatch}), [state]);
    return (
      <Provider value={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };
