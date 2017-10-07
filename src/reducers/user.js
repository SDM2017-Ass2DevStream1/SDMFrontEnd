import { createReducer } from 'redux-action-tools';
import {
  GET_CURRENT_USER, USER_LOGOUT,
} from '../constants/action_types';


export const initialState = null;

const reducer = createReducer()
  .when(GET_CURRENT_USER)
  .done((state, { payload: { data } }) => {
    return data;
  })

  .when(USER_LOGOUT, () => {
    return null;
  })

  .build(initialState);

export default reducer;
