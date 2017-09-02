import axios from 'axios';
import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const getCurrentUser = createAsyncAction(
  types.GET_CURRENT_USER,

  () => {
    return axios.get('/api/current_user');
  },
);

export const userLogin = createAsyncAction(
  types.USER_LOGIN,

  () => {
    return axios.get('/api/user/login');
  },
);

export const userLogout = createAsyncAction(
  types.USER_LOOUT,

  () => {
    return axios.get('/api/user/logout');
  },
);
