import reducer, { initialState } from './search';
import * as types from '../constants/action_types';


describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should update query whenever there is a search', () => {
    expect(reducer({
      query: {
        page: 1,
      },
    }, {
      type: types.SEARCH_ARTICLES,
      payload: {
        term: 'search term',
      },
    })).toEqual({
      query: {
        page: 1,
        term: 'search term',
      },
    });
  });
});
