import {INCREMENT_COUNTER} from './actionTypes';

const initialState = {
  value: 0,
};

const reducer = (state = initialState, action) => {
  console.log('recucer', state)
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {...state, value: action.value};

    default:
      return state;
  }
};

export default reducer;
