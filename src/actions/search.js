import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';


const maybe = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const search = createAsyncAction(types.SEARCH, maybe({
  payload: {
    items: [
      {
        title: 'Title',
        desc: 'Description',
      },
    ],
  },
}));
