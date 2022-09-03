import {useReducer as useReducerWithDevTools} from 'reinspect';
import {compose} from 'utils/compose';

/**
 * @typedef {Object} State - Global state object
 */

/**
 * @typedef {{}} Action - Action object
 * @property {string} type
 * @example
 * {type: 'FOO'}
 */

/**
 * @function middlewareCallback
 * @param {Action} value
 * @return Action
 */

/**
 * @function dispatch
 * @param {Action} action - Action
 */

/**
 * React hook to connect reducer actions and middlewares
 * @function
 * @param {Reducer} reducer
 * @param {State} initialState
 * @param {(function(dispatch): function(Action): Action)[]} [middlewareFns]
 * @return {[State, dispatch]}
 */
export const useReducer = (reducer, initialState, middlewareFns = []) => {
  const [state, dispatch] = useReducerWithDevTools(
    reducer,
    initialState,
    a => a,
    'App'
  );

  const dispatchWithMiddleware = action => {
    /* Apply dispatch method to all middlewares and reverse order so the left middleware applied first */
    // eslint-disable-next-line fp/no-mutating-methods
    const middlewaresReversed = middlewareFns
      .map(middleware => middleware(dispatch))
      .reverse();
    compose(dispatch, ...middlewaresReversed)(action);
  };

  return [state, dispatchWithMiddleware];
};
