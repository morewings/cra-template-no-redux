import {useReducer as useReducerWithDevTools} from 'reinspect';
import {compose} from 'utils/compose';

export const useReducer = (reducer, initialState, middlewareFns) => {
  const [state, dispatch] = useReducerWithDevTools(
    reducer,
    initialState,
    a => a,
    'App'
  );

  const dispatchWithMiddleware = action => {
    // compose(dispatch,...middlewareFns.reverse())
    middlewareFns.forEach(middlewareFn => middlewareFn(dispatch, action));
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};
