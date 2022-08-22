import {useAppContext} from 'withReducer';

export const useSelector = callback => {
  const {state} = useAppContext();
  return callback(state);
};
