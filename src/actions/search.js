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

export const updateSearchQuery = createAsyncAction(
  types.UPDATE_SEARCH_QUERY,
);
