import React, {useReducer} from 'react';

export const createStoreProvider =
  ({initialState, reducer, context}) =>
  WrappedComponent =>
  props => {
    const {Provider} = context;
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log('reducer', reducer)
    console.log('initialState', initialState)
    console.log('state', state)
    return (
      <Provider value={{state, dispatch}}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };
