import _ from 'lodash';
import moment from 'moment';
import { createReducer } from 'redux-action-tools';

import { SEARCH_RESULTS_COLUMN } from '../constants';
import * as types from '../constants/action_types';


export const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
    sortBy: 'relevance',
  },
  condition: {
    date: {
      from: moment('1950-01-01', 'YYYY-MM-DD').toDate(),
      to: moment().toDate(),
    },
    others: [],
  },
  items: [],
  total: 0,
  visibility: {
    [SEARCH_RESULTS_COLUMN.AUTHORS]: true,
    [SEARCH_RESULTS_COLUMN.METHOD]: true,
    [SEARCH_RESULTS_COLUMN.YEAR]: true,
    [SEARCH_RESULTS_COLUMN.RATING]: true,
  },
};

const updateQuery = (state, { payload }) => {
  const query = _.merge({}, state.query, payload);
  return { ...state, query };
};

const reducer = createReducer()
  .when(types.SEARCH_ARTICLES, updateQuery)
  .done((state, { payload: { data } }) => ({
    ...state,
    ...data,
  }))

  .when(types.UPDATE_SEARCH_QUERY, updateQuery)

  .when(types.SET_SEARCH_CONDITION, (state, { payload }) => {
    const condition = _.merge({}, state.condition, payload);
    return { ...state, condition };
  })

  .when(types.CHANGE_COLUMN_VISIBILITY, (state, { payload }) => ({
    ...state,
    visibility: {
      ...state.visibility,
      [payload.column]: payload.checked,
    },
  }))

  .when(types.ADD_DATE_RANGE, state => ({
    ...state,
    query: {
      ...state.query,
      date: state.condition.date,
    },
  }))

  .when(types.REMOVE_DATE_RANGE, (state) => {
    const newState = _.cloneDeep(state);
    delete newState.query.date;
    return newState;
  })

  .when(types.RESET_DATE_RANGE, state => ({
    ...state,
    condition: {
      ...state.condition,
      date: initialState.condition.date,
    },
  }))

  .when(types.SORT_SEARCH_RESULTS_BY, (state, { payload }) => ({
    ...state,
    query: {
      ...state.query,
      page: initialState.query.page,
      sortBy: payload,
    },
  }))

  .when(types.ADD_CONDITION, (state) => {
    const newState = _.cloneDeep(state);
    newState.condition.others.push({
      type: 'test type',
    });
    return newState;
  })

  .build(initialState);

export default reducer;
