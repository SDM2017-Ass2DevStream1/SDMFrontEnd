import _ from 'lodash';
import moment from 'moment';
import { createReducer } from 'redux-action-tools';
import {
  SEARCH_ARTICLES, UPDATE_SEARCH_QUERY, CHANGE_COLUMN_VISIBILITY,
  SET_SEARCH_CONDITION, ADD_DATE_RANGE, REMOVE_DATE_RANGE, RESET_DATE_RANGE,
} from '../constants/action_types';


export const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
  },
  condition: {
    date: {
      from: moment('1950-01-01', 'YYYY-MM-DD').toDate(),
      to: moment().toDate(),
    },
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

const updateQuery = (state, { payload }) => {
  const query = _.merge({}, state.query, payload);
  return { ...state, query };
};

const reducer = createReducer()
  .when(SEARCH_ARTICLES, updateQuery)
  .done((state, { payload: { data } }) => ({
    ...state,
    ...data,
  }))

  .when(UPDATE_SEARCH_QUERY, updateQuery)

  .when(SET_SEARCH_CONDITION, (state, { payload }) => {
    const condition = _.merge({}, state.condition, payload);
    return { ...state, condition };
  })

  .when(CHANGE_COLUMN_VISIBILITY, (state, { payload }) => ({
    ...state,
    visibility: {
      ...state.visibility,
      [payload.column]: payload.checked,
    },
  }))

  .when(ADD_DATE_RANGE, state => ({
    ...state,
    query: {
      ...state.query,
      date: state.condition.date,
    },
  }))

  .when(REMOVE_DATE_RANGE, (state) => {
    const newState = _.cloneDeep(state);
    delete newState.query.date;
    return newState;
  })

  .when(RESET_DATE_RANGE, state => ({
    ...state,
    condition: {
      ...state.condition,
      date: initialState.condition.date,
    },
  }))

  .build(initialState);

export default reducer;
