import React, {useContext} from 'react';
import {combineReducers} from 'utils/combineReducers';
import {CounterReducer} from 'features/counter';
import {RandomReducer} from 'features/random';
import {createStoreProvider} from 'utils/createStoreProvider';

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  count: CounterReducer,
  random: RandomReducer,
});

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext)

export const withReducer = createStoreProvider({
  reducer: rootReducer,
  context: AppContext,
  initialState: {
    value: 0,
  }
});
