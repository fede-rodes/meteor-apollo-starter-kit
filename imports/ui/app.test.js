import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

const Component = () => (<div>Hey</div>);

describe('App component', () => {
  it('<App /> should render', () => {
    const wrapper = shallow(<App component={Component} />);
    expect(wrapper.exists()).toBe(true);
  });
});
