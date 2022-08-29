import {useAppContext} from 'AppContext';
import axios from 'axios';
import config from 'config';
import {GET_RANDOM_NUMBER} from './actionTypes';

const useGetRandomNumberQuery = () => {
  const {dispatch} = useAppContext();
  return () =>
    dispatch({
      type: GET_RANDOM_NUMBER,
      payload: axios.get(config.randomAPI),
    });
};

export default useGetRandomNumberQuery;
