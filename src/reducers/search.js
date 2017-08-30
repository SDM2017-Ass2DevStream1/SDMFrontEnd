import { createReducer } from 'redux-action-tools';
import { SEARCH_ARTICLES } from '../constants/action_types';


const initialState = {
  term: '',
  query: {},
};

const reducer = createReducer()
  .when(SEARCH_ARTICLES)
  .done(state => state)
  .build(initialState);

export default reducer;
