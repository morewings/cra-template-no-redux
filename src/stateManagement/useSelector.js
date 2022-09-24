import {useAppContext} from './AppContext';

export const useSelector = callback => {
  const {state} = useAppContext();
  return callback(state);
};
