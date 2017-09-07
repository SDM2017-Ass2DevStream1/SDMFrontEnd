import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../src/containers/header';

const props = {
  onClick: jest.fn(),
};

describe('SearchIndex component', () => {
  it('should render dom', () => {
    const wrapper = shallow(<AppBar {...props}/>);
    expect(wrapper.find('span').text()).toContain('To Apply Conditions');
  })
});