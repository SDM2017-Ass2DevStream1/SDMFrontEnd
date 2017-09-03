import { createReducer } from 'redux-action-tools';
import { SEARCH_ARTICLES } from '../constants/action_types';


const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
  },
  items: [],
  total: 0,
};

const reducer = createReducer()
  .when(SEARCH_ARTICLES, (state, { payload }) => {
    return {
      ...state,
      query: {
        ...state.query,
        ...payload,
      },
    };
  })
  .done((state, { payload: { data } }) => {
    return {
      ...state,
      ...data,
    };
  })

  .build(initialState);

export default reducer;
