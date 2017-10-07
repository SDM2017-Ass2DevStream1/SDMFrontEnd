import reducer, { initialState } from './user';
import * as types from '../constants/action_types';


describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle USER_LOGOUT', () => {
    expect(reducer({
      name: 'Jarvis Gleason',
      username: 'Dortha.Eichmann',
      email: 'Noe_Champlin46@gmail.com',
    }, {
      type: types.USER_LOGOUT,
    })).toEqual(null);
  });
});
