import React, {useMemo} from 'react';
import {useReducer} from 'utils/useReducer';
import {promiseResolverMiddleware} from 'middlewares/promiseResolverMiddleware';
import {loggerMiddleware} from 'middlewares/loggerMiddleware';
import {combineReducers} from 'utils/combineReducers';
import {CounterReducer, initialState as counterState} from 'features/counter';
import {RandomReducer, initialState as randomState} from 'features/random';
import {AppContext} from 'AppContext';

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  count: CounterReducer,
  random: RandomReducer,
});

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

const initialState = {count: counterState, random: randomState};

/**
 * HOC wraps provided component with app Context
 * @function
 * @param {React.ComponentElement} Component - React component to wrap
 * @return {React.ElementType}
 */
export const withReducer = createStoreProvider({
  reducer: rootReducer,
  context: AppContext,
  initialState,
});
