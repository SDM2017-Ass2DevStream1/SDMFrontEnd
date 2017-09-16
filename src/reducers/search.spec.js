import _ from 'lodash';

import reducer, { initialState } from './search';
import { SEARCH_RESULTS_COLUMN, SORT_BY_METHOD } from '../constants';
import * as types from '../constants/action_types';


describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ARTICLES', () => {
    expect(reducer(initialState, {
      type: types.FETCH_ARTICLES,
      payload: {
        term: 'search term',
      },
    })).toEqual(_.merge({}, initialState, {
      query: {
        term: 'search term',
      },
    }));
  });

  it('should handle SORT_SEARCH_RESULTS_BY', () => {
    const sortBy = {
      key: SEARCH_RESULTS_COLUMN.TITLE,
      order: SORT_BY_METHOD.DESC,
    };

    expect(reducer(_.merge({}, initialState, {
      query: {
        page: 10,
      },
    }), {
      type: types.SORT_SEARCH_RESULTS_BY,
      payload: {
        ...sortBy,
      },
    })).toEqual(_.merge({}, initialState, {
      query: { sortBy },
    }));
  });
});
