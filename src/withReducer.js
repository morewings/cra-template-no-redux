import {combineReducers} from 'utils/combineReducers';
import {CounterReducer, initialState as counterState} from 'features/counter';
import {RandomReducer} from 'features/random';
import {createStoreProvider} from 'utils/createStoreProvider';
import {AppContext} from 'AppContext';

const initialState = {count: counterState};

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  count: CounterReducer,
  random: RandomReducer,
});

export const withReducer = createStoreProvider({
  reducer: rootReducer,
  context: AppContext,
  initialState,
});
