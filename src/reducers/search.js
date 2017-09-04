import { createReducer } from 'redux-action-tools';
import {
  SEARCH_ARTICLES, UPDATE_SEARCH_QUERY, CHANGE_COLUMN_VISIBILITY,
} from '../constants/action_types';


const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
  },
  items: [],
  total: 0,
  visibility: {
    title: true,
    authors: true,
    year: true,
    rating: true,
  },
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

  .when(CHANGE_COLUMN_VISIBILITY, (state, { payload }) => {
    console.log(payload);

    return {
      ...state,
      visibility: {
        ...state.visibility,
        [payload.column]: payload.visibility,
      },
    };
  })

  .build(initialState);

export default reducer;
