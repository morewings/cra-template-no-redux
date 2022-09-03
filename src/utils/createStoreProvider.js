import React, {useMemo} from 'react';
import {useReducer} from 'utils/useReducer';
import {promiseResolverMiddleware} from 'middlewares/promiseResolverMiddleware';
import {loggerMiddleware} from 'middlewares/loggerMiddleware';

/**
 * @typedef {Object} State
 */

/**
 * @typedef {Object} ProviderConfig - ProviderConfig
 * @property {State} initialState  - State object
 * @property {Reducer} reducer
 * @property {React.Context} context
 */

/**
 * @function callback
 *
 */

/**
 * @function
 * @param {ProviderConfig} providerInfo
 * @return {function(React.ComponentElement): React.ElementType}
 */
export const createStoreProvider =
  ({initialState, reducer, context}) =>
  WrappedComponent =>
  props => {
    const {Provider} = context;
    const [state, dispatch] = useReducer(reducer, initialState, [
      promiseResolverMiddleware,
      loggerMiddleware,
    ]);
    // Important(!): memoize array value. Else all context consumers update on *every* render
    const store = useMemo(() => ({state, dispatch}), [state]);
    return (
      <Provider value={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };
