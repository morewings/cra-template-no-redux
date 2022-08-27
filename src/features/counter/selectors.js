import {useSelector} from 'utils/useSelector';
import {useAppContext} from 'AppContext';

/**
 * Custom React Hook to get count value from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const useCountValue = () => {
  const test = useSelector(state => state?.count?.value);
  console.log('test', test)
  return useSelector(state => state?.count?.value);
};

export default useCountValue;
