import axios from 'axios';
import { Base64 } from 'js-base64';
import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';

export const fetchArticles = createAsyncAction(
  types.FETCH_ARTICLES,
  query => axios.get('/api/search', {
    params: {
      query: Base64.encode(JSON.stringify(query)),
    },
  }),
);

export const updateSearchQuery = query => ({
  type: types.UPDATE_SEARCH_QUERY,
  payload: query,
});

export const setSearchCondition = condition => ({
  type: types.SET_SEARCH_CONDITION,
  payload: condition,
});

export const changeColumnVisibility = (column, checked) => ({
  type: types.CHANGE_COLUMN_VISIBILITY,
  payload: { column, checked },
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

export const sortSearchResultsBy = sortBy => ({
  type: types.SORT_SEARCH_RESULTS_BY,
  payload: sortBy,
});

export const addCondition = () => ({
  type: types.ADD_CONDITION,
});

export const removeCondition = () => ({
  type: types.REMOVE_CONDITION,
});
