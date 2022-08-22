import {useCallback} from 'react';
import {useAppContext} from 'withReducer';
import useCountValue from './selectors';
import {INCREMENT_COUNTER} from './actionTypes';

const useIncrementCounter = () => {
  const {dispatch} = useAppContext();
  const count = useCountValue();
  return useCallback(() => {
    dispatch({
      type: INCREMENT_COUNTER,
      value: count + 1,
    });
  }, [count, dispatch]);
};

export default useIncrementCounter;
