import _ from 'lodash';


// The constants of RESEARCH_DESIGN, SE_METHODS, SE_METHODOLOGIES shoud
// be used both on the front & back ends. All the names here was given
// by Jim (see: SDM INFS809 Assignment 2 Supporting Documentation).
export const RESEARCH_DESIGN = {
  CASE_STUDY: 'Case study',
  FIELD_OBSERVATION: 'Field Observation',
  EXPERIMENT: 'Experiment',
  INTERVIEW: 'Interview',
  SURVERY: 'Survey',
};

export const SE_METHOD = {
  TDD: 'TDD',
  BDD: 'BDD',
  PAIR_PROGRAMMING: 'pair programming',
  PLANNING_POKER: 'planning poker',
  DAILY_STANDUP_MEETING: 'daily standup meetings',
  STORY_BOARDS: 'story boards',
  USER_STORY_MAPPING: 'user story mapping',
  CONTINUOUS_INTEGRATION: 'continuous integration',
  RETROSPECTIVES: 'retrospectives',
  BURN_DOWN_CHARTS: 'burn down charts',
  REQUIREMENTS_PRIORITISATION: 'requirements prioritisation',
  VERSION_CONTROL: 'version control',
  CODE_SHARING: 'code sharing',
};

export const SE_METHODOLOGY = {
  SCRUM: 'Scrum',
  WATERFALL: 'Waterfall',
  SPIRAL: 'Spiral',
  XP: 'XP',
  RATIONAL_UNIFIED_PROCESS: 'Rational Unified Process',
  CRYSTAL: 'Crystal',
  CLEAN_ROOM: 'Clean room',
  FEATURE_DRIVEN_DEVELOPMENT: 'Feature Driven Development',
  MODEL_DRIVEN_DEVELOPMENT: 'Model Driven Development',
  DOMAIN_DRIVEN_DEVELOPMENT: 'Domain Driven Development',
  FORMAL_METHODS: 'Formal methods',
  PROBLEM_DRIVEN_DEVELOPMENT: 'Problem Driven Development',
  CLOUD_COMPUTING: 'Cloud computing',
  SERVICE_ORIENTED_DEVELOPMENT: 'Service Oriented Development',
  ASPECT_ORIENTED_DEVELOPMENT: 'Aspect Oriented Development',
  VALUSE_DRIVEN_DEVELOPMENT: 'Valuse Driven Development',
  PRODUCT_DRIVEN_DEVELOPMENT: 'Product Driven Development',
  AGILE: 'Agile',
};

export const SEARCH_RESULTS_COLUMN = {
  TITLE: 'title',
  AUTHORS: 'authors',
  YEAR: 'year',
  RATING: 'rating',
  DESIGN: 'design',
  METHOD: 'method',
  METHODOLOGY: 'methodology',
};

export const SORT_BY_METHOD = {
  ASC: 'asc',
  DESC: 'desc',
};

const convertToOptions = (optionMapping) => {
  return _.values(optionMapping).map((name, i) => {
    const type = i + 1;
    return { type, name };
  });
};

const SEARCH_CONDITION_TYPE = {
  AND: 'AND',
  OR: 'OR',
};

export const SEARCH_CONDITION_TYPES = convertToOptions(
  SEARCH_CONDITION_TYPE,
);

const SEARCH_CONDITION_FIELD = {
  AUTHORS: 'Authors',
  RATING: 'Credibility Rating',
  DESIGN: 'Research Design',
  METHOD: 'SE Method',
  METHODOLOGY: 'SE Methodology',
};

export const SEARCH_CONDITION_FIELDS = convertToOptions(
  SEARCH_CONDITION_FIELD,
);

const SEARCH_CONDITION_OPRATOR = {
  CONTAINS: 'contains',
  DOES_NOT_CONTAINS: 'does not contains',
  BEGINS_WITH: 'begins with',
  ENDS_WITH: 'ends with',
  IS_EQUAL_TO: 'is equal to', // only if fixed values
  IS_LESS_THAN_OR_EQUAL_TO: 'is less than or equal to', // if numeric
  IS_MORE_THAN_OR_EQUAL_TO: 'is more than or equal to', // if numeric
};

export const SEARCH_FIELD_OPERATOR_MAP = {
  [SEARCH_CONDITION_FIELD.AUTHORS]: {
    operators: convertToOptions([
      SEARCH_CONDITION_OPRATOR.CONTAINS,
      SEARCH_CONDITION_OPRATOR.DOES_NOT_CONTAINS,
      SEARCH_CONDITION_OPRATOR.BEGINS_WITH,
      SEARCH_CONDITION_OPRATOR.BEGINS_WITH,
      SEARCH_CONDITION_OPRATOR.IS_EQUAL_TO,
    ]),
  },

  [SEARCH_CONDITION_FIELD.RATING]: {
    operators: convertToOptions([
      SEARCH_CONDITION_OPRATOR.IS_EQUAL_TO,
      SEARCH_CONDITION_OPRATOR.IS_LESS_THAN_OR_EQUAL_TO,
      SEARCH_CONDITION_OPRATOR.IS_MORE_THAN_OR_EQUAL_TO,
    ]),
    options: convertToOptions(_.times(5)),
  },

  [SEARCH_CONDITION_FIELD.DESIGN]: {
    operators: convertToOptions([
      SEARCH_CONDITION_OPRATOR.CONTAINS,
      SEARCH_CONDITION_OPRATOR.DOES_NOT_CONTAINS,
      SEARCH_CONDITION_OPRATOR.IS_EQUAL_TO,
    ]),
    options: convertToOptions(RESEARCH_DESIGN),
  },

  [SEARCH_CONDITION_FIELD.METHOD]: {
    operators: [
      SEARCH_CONDITION_OPRATOR.CONTAINS,
      SEARCH_CONDITION_OPRATOR.DOES_NOT_CONTAINS,
      SEARCH_CONDITION_OPRATOR.IS_EQUAL_TO,
    ],
    options: convertToOptions(SE_METHOD),
  },

  [SEARCH_CONDITION_FIELD.METHODOLOGY]: {
    operators: [
      SEARCH_CONDITION_OPRATOR.CONTAINS,
      SEARCH_CONDITION_OPRATOR.DOES_NOT_CONTAINS,
      SEARCH_CONDITION_OPRATOR.IS_EQUAL_TO,
    ],
    options: convertToOptions(SE_METHODOLOGY),
  },
};
