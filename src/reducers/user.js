import { createReducer } from 'redux-action-tools';
import { GET_CURRENT_USER } from '../constants/action_types';


const initialState = null;

const reducer = createReducer()
  .when(GET_CURRENT_USER)
  .done((state, { payload: { data } }) => {
    return {
      ...state,
      ...data,
    };
  })
  .build(initialState);

export default reducer;
