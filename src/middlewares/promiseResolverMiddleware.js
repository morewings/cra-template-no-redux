/** Custom middleware function to resolve Promise given as an action payload property.
 * @see https://redux.js.org/understanding/history-and-design/middleware
 */
export const promiseResolverMiddleware = dispatch => action => {
  if (typeof action?.payload?.then === 'function') {
    action.payload.then(
      response => {
        /** Use dispatch here and below to dispatch a new action through all
         * middlewares instead just pass it to next middleware */
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: response,
        });
      },
      () => {
        dispatch({
          type: `${action.type}_REJECTED`,
        });
      }
    );
    /** Pass *_PENDING action to next middleware */
    return {type: `${action.type}_PENDING`};
  }

  /** Pass through other actions */
  return action;
};
