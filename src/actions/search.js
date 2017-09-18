import axios from 'axios';
import { Base64 } from 'js-base64';
import { createAsyncAction } from 'redux-action-tools';

import { initialState } from '../reducers/search';
import { SORT_BY_METHOD } from '../constants';
import * as types from '../constants/action_types';


export const fetchArticles = createAsyncAction(
  types.FETCH_ARTICLES,

  query => axios.get('/api/search', {
    params: {
      query: Base64.encode(JSON.stringify(query)),
    },
  }),
);

export const updateSearchQuery = payload => ({
  type: types.UPDATE_SEARCH_QUERY,
  payload,
});

export const setSearchCondition = condition => ({
  type: types.SET_SEARCH_CONDITION,
  payload: condition,
});

export const setVisibleColumns = payload => ({
  type: types.SET_VISIBLE_COLUMNS,
  payload,
});

export const addDateRange = () => ({
  type: types.ADD_DATE_RANGE,
});

export const removeDateRange = () => ({
  type: types.REMOVE_DATE_RANGE,
});

export const resetDateRange = () => ({
  type: types.RESET_DATE_RANGE,
});

export const sortSearchResultsBy = (key, query) => {
  const { sortBy } = query;

  if (sortBy.key === key) {
    if (sortBy.order === SORT_BY_METHOD.ASC) {
      sortBy.order = SORT_BY_METHOD.DESC;
    } else {
      delete sortBy.key;
      delete sortBy.order;
    }
  } else {
    sortBy.key = key;
    sortBy.order = SORT_BY_METHOD.ASC;
  }

  return fetchArticles({
    ...query,
    page: initialState.query.page,
    sortBy,
  });
};

export const selectCondition = (type, value, index) => ({
  type: types.SELECT_CONDITION,
  payload: { type, value, index },
});

export const addCondition = () => ({
  type: types.ADD_CONDITION,
});

export const removeCondition = payload => ({
  type: types.REMOVE_CONDITION,
  payload,
});
