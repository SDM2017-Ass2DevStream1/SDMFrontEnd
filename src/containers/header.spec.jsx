import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Header from './header';
import { muiTheme } from '../constants/styles';


describe('Header container', () => {
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore();
    wrapper = shallow(<Header store={store} />, {
      context: { muiTheme },
      childContextTypes: { muiTheme: PropTypes.object },
    });
  });

  it('should display brand name', () => {
    expect(wrapper.test()).to.equal('dd');
  });
});
