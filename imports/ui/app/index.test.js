import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

const Component = () => (<div>Hey</div>);

describe('App component', () => {
  it('<App /> should render', () => {
    const wrapper = shallow(<App component={Component} />);
    expect(wrapper.exists()).toBe(true);
  });
});
