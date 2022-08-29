import {useReducer as useReducerWithDevTools} from 'reinspect';

export const useReducer = (reducer, initialState, middlewareFns) => {
  const [state, dispatch] = useReducerWithDevTools(reducer, initialState);

  const dispatchWithMiddleware = action => {
    middlewareFns.forEach(middlewareFn => middlewareFn(action));
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};
