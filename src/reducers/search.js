import _ from 'lodash';
import moment from 'moment';
import { createReducer } from 'redux-action-tools';

import {
  SEARCH_RESULTS_COLUMN, SEARCH_CONDITION_TYPES,
  SEARCH_CONDITION_FIELDS, SEARCH_FIELD_OPERATORS,
  SEARCH_CONDITION_FIELD_TYPE,
} from '../constants';
import * as types from '../constants/action_types';


export const initialState = {
  query: {
    term: '',
    limit: 15,
    page: 1,
    sortBy: {}, // { type, order }
    date: {}, // { from, to }
    conditions: [], // [{ type, field, operator, option }]
  },
  condition: {
    date: {
      from: moment('1950-01-01', 'YYYY-MM-DD').toDate(),
      to: moment().toDate(),
    },

    // the format of an item in others:
    // {
    //   types, fields, operators, options,
    //   select: { type, field, operator, option },
    // }
    others: [],
  },
  items: [],
  total: 0,
  visibility: {
    [SEARCH_RESULTS_COLUMN.AUTHORS]: true,
    [SEARCH_RESULTS_COLUMN.YEAR]: true,
    [SEARCH_RESULTS_COLUMN.RATING]: true,
    [SEARCH_RESULTS_COLUMN.DESIGN]: true,
    [SEARCH_RESULTS_COLUMN.METHOD]: true,
    [SEARCH_RESULTS_COLUMN.METHODOLOGY]: true,
  },
};

const updateQuery = (state, { payload }) => {
  const query = _.merge({}, state.query, payload);
  return { ...state, query };
};

const reducer = createReducer()
  .when(types.FETCH_ARTICLES, updateQuery)
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
    return _.cloneDeep({}, state, {
      query: {
        date: initialState.query.data,
      },
    });
  })

  .when(types.RESET_DATE_RANGE, state => ({
    ...state,
    condition: {
      ...state.condition,
      date: initialState.condition.date,
    },
  }))

  .when(types.SORT_SEARCH_RESULTS_BY, (state, { payload }) => (
    _.merge({}, state, {
      query: {
        page: initialState.query.page,
        sortBy: {
          ...payload,
        },
      },
    })
  ))

  .when(types.SELECT_CONDITION, (state, { payload }) => {
    const { type, value, index } = payload;
    const newState = _.cloneDeep(state);

    _.assign(newState.query.conditions[index], {
      [type]: value,
    });

    return newState;
  })

  .when(types.ADD_CONDITION, (state) => {
    const newState = _.cloneDeep(state);
    const { operators, options } = SEARCH_FIELD_OPERATORS[
      SEARCH_CONDITION_FIELD_TYPE.RATING
    ];

    // FIXME
    newState.condition.others.push({
      types: SEARCH_CONDITION_TYPES,
      fields: SEARCH_CONDITION_FIELDS,
      operators,
      options,
    });

    // FIXME: options should be an integer or empty string
    newState.query.conditions.push({
      type: 1,
      field: 1,
      operator: 1,
      option: 1,
    });

    return newState;
  })

  .when(types.REMOVE_CONDITION, (state, { payload }) => {
    const newState = _.cloneDeep(state);
    const { others } = newState.condition;

    newState.condition.others = others.slice(0, payload)
      .concat(others.slice(payload + 1));

    return newState;
  })

  .build(initialState);

export default reducer;
