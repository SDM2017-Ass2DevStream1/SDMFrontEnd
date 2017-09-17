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

  it('should handle ADD_CONDITION', () => {
    expect(initialState.condition.others.length).toEqual(0);

    const addedState = reducer(initialState, {
      type: types.ADD_CONDITION,
    });

    expect(addedState.condition.others[0]).toEqual(
      expect.objectContaining({
        types: expect.any(Array),
        fields: expect.any(Array),
        operators: expect.any(Array),
      }),
    );

    expect(addedState.query.conditions[0]).toEqual(
      expect.objectContaining({
        type: 1,
        field: 1,
        operator: 1,
        option: expect.anything(),
      }),
    );

    const addedState2 = reducer(addedState, {
      type: types.ADD_CONDITION,
    });

    expect(addedState2.condition.others.length).toEqual(2);
  });

  it('should handle REMOVE_CONDITION', () => {
    const addedState = reducer(initialState, {
      type: types.ADD_CONDITION,
    });

    // Cannot remove a elem by passing an index outside the array.
    // Thus, in this case, the lengh of others should still be one.
    expect(
      reducer(addedState, {
        type: types.REMOVE_CONDITION,
        payload: 2,
      }).condition.others.length,
    ).toEqual(1);

    expect(
      reducer(addedState, {
        type: types.REMOVE_CONDITION,
        payload: 0,
      }).condition.others.length,
    ).toEqual(0);
  });
});
