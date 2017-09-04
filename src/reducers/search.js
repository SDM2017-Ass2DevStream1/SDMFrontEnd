import { createReducer } from 'redux-action-tools';
import {
  SEARCH_ARTICLES, UPDATE_SEARCH_QUERY,
} from '../constants/action_types';


const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
  },
  items: [],
  total: 0,
};

const updateQuery = (state, { payload }) => ({
  ...state,
  query: {
    ...state.query,
    ...payload,
  },
});

const reducer = createReducer()
  .when(SEARCH_ARTICLES, updateQuery)
  .done((state, { payload: { data } }) => {
    return {
      ...state,
      ...data,
    };
  })

  .when(UPDATE_SEARCH_QUERY, updateQuery)

  .build(initialState);

export default reducer;
