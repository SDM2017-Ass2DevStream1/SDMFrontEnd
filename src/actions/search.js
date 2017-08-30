import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';


const fakeAPI = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const searchArticles = createAsyncAction(
  types.SEARCH_ARTICLES,

  (term) => {
    return fakeAPI({
      query: {
        term,
      },
      items: [
        {
          id: '1',
          title: 'Title 1',
          desc: 'Description 1',
        },
        {
          id: '2',
          title: 'Title 2',
          desc: 'Description 2',
        },
      ],
    });
  },
);
