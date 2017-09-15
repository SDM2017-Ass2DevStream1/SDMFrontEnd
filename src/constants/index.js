// ref: http://www.itinfo.am/eng/software-development-methodologies/
// This constant shoud be used both on the front & back ends.
export const SE_METHODS = [
  {
    type: 1,
    name: 'Agile Software Development',
  },
  {
    type: 2,
    name: 'Crystal Methods',
  },
  {
    type: 3,
    name: 'Dynamic Systems Development Model (DSDM)',
  },
  {
    type: 4,
    name: 'Extreme Programming (XP)',
  },
  {
    type: 5,
    name: 'Feature Driven Development (FDD)',
  },
  {
    type: 6,
    name: 'Joint Application Development (JAD)',
  },
  {
    type: 7,
    name: 'Lean Development (LD)',
  },
  {
    type: 8,
    name: 'Rapid Application Development (RAD)',
  },
  {
    type: 9,
    name: 'Rational Unified Process (RUP)',
  },
  {
    type: 10,
    name: 'Scrum',
  },
  {
    type: 11,
    name: 'Spiral',
  },
  {
    type: 12,
    name: 'Systems Development Life Cycle (SDLC)',
  },
  {
    type: 13,
    name: 'Waterfall (a.k.a. Traditional)',
  },
];

export const SEARCH_RESULTS_COLUMN = {
  AUTHORS: 'authors',
  METHOD: 'method',
  YEAR: 'year',
  RATING: 'rating',
};

export const SEARCH_CONDITION_FIELD = {
  AUTHORS: 'Authors',
  RATING: 'Rating',
  METHOD: 'SE Method',
};

const SEARCH_CONDITION_OPRATOR = {
  CONTAINS: 'contains',
  DOES_NOT_CONTAINS: 'does not contains',
  BEGINS_WITH: 'begins with',
  ENDS_WITH: 'ends with',
  IS_EQUAL_TO: 'is equal to', // only if fixed values
  IS_LESS_THAN_OR_EQUAL_TO: 'is less than or equal to', // if numeric
  IS_MORE_THAN_OR_EQUAL_TO: 'is more than or equal to', // if numeric
};

export const CONDITION_OPERATOR = {
  [SEARCH_CONDITION_FIELD.AUTHORS]: {
    operator: [
      SEARCH_CONDITION_OPRATOR.CONTAINS,
      SEARCH_CONDITION_OPRATOR.DOES_NOT_CONTAINS,
      SEARCH_CONDITION_OPRATOR.BEGINS_WITH,
      SEARCH_CONDITION_OPRATOR.BEGINS_WITH,
    ],
  },
};
