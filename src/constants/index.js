// The constants of RESEARCH_DESIGN, SE_METHODS, SE_METHODOLOGIES shoud
// be used both on the front & back ends. All the names here was given
// by Jim (see: SDM INFS809 Assignment 2 Supporting Documentation).
export const RESEARCH_DESIGN = [
  { type: 1, name: 'Case study' },
  { type: 2, name: 'Field Observation' },
  { type: 3, name: 'Experiment' },
  { type: 4, name: 'Interview' },
  { type: 5, name: 'Survey' },
];

export const SE_METHODS = [
  { type: 1, name: 'TDD' },
  { type: 2, name: 'BDD' },
  { type: 3, name: 'pair programming' },
  { type: 4, name: 'planning poker' },
  { type: 5, name: 'daily standup meetings' },
  { type: 6, name: 'story boards' },
  { type: 7, name: 'user story mapping' },
  { type: 8, name: 'continuous integration' },
  { type: 9, name: 'retrospectives' },
  { type: 10, name: 'burn down charts' },
  { type: 11, name: 'requirements prioritisation' },
  { type: 12, name: 'version control' },
  { type: 13, name: 'code sharing' },
];

export const SE_METHODOLOGIES = [
  { type: 1, name: 'Scrum' },
  { type: 2, name: 'Waterfall' },
  { type: 3, name: 'Spiral' },
  { type: 4, name: 'XP' },
  { type: 5, name: 'Rational Unified Process' },
  { type: 6, name: 'Crystal' },
  { type: 7, name: 'Clean room' },
  { type: 8, name: 'Feature Driven Development' },
  { type: 9, name: 'Model Driven Development' },
  { type: 10, name: 'Domain Driven Development' },
  { type: 11, name: 'Formal methods' },
  { type: 12, name: 'Problem Driven Development' },
  { type: 13, name: 'Cloud computing' },
  { type: 14, name: 'Service Oriented Development' },
  { type: 15, name: 'Aspect Oriented Development' },
  { type: 16, name: 'Valuse Driven Development' },
  { type: 17, name: 'Product Driven Development' },
  { type: 18, name: 'Agile' },
];

export const SEARCH_RESULTS_COLUMN = {
  TITLE: 'title',
  AUTHORS: 'authors',
  YEAR: 'year',
  RATING: 'rating',
  DESIGN: 'design',
  METHOD: 'method',
  METHODOLOGY: 'methodology',
};

export const SEARCH_CONDITION_FIELD = {
  AUTHORS: 'Authors',
  RATING: 'Credibility Rating',
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
