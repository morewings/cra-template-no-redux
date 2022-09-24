import {Fragment} from 'react';
import {AppContext} from 'stateManagement/AppContext';
import {createStoreProvider, rootReducer} from 'stateManagement/withStore';

export const mockProvider = ({initialState, enhancers}) =>
  createStoreProvider({
    reducer: rootReducer,
    context: AppContext,
    initialState,
    enhancers
  })(Fragment);
