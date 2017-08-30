import { createReducer } from 'redux-action-tools';
import { SEARCH } from '../constants/action_types';


const initialState = {
  term: '',
  query: {},
};

const reducer = createReducer()
  .when(SEARCH)
  .done(state => state)
  .build(initialState);

export default reducer;
