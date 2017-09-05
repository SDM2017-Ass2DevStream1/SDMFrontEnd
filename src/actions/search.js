import axios from 'axios';
import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const searchArticles = createAsyncAction(
  types.SEARCH_ARTICLES,

  ({ term }) => {
    return axios.get('/api/search', {
      term,
    });
  },
);

export const updateSearchQuery = query => ({
  type: types.UPDATE_SEARCH_QUERY,
  payload: query,
});

export const resetDateRange = () => ({
  type: types.RESET_DATE_RANGE,
});

export const changeColumnVisibility = (column, checked) => ({
  type: types.CHANGE_COLUMN_VISIBILITY,
  payload: { column, checked },
});
