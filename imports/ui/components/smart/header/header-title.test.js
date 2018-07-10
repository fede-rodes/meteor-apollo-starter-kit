import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Constants from '../../../../api/constants';
import HeaderTitle from './header-title';

const mockUser = {
  _id: '123',
  createdAt: new Date(),
  services: ['email'],
  emails: {
    address: 'test@test.com',
    verified: true,
  },
  profile: {
    name: 'John Doe',
    gender: 'male',
    avatar: 'bla.jpg',
  },
  subscriptions: [],
};

const tester = ({ path, label, curUser }) => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={[path]}
      initialIndex={0}
    >
      <HeaderTitle curUser={curUser} />
    </MemoryRouter>,
  );
  expect(wrapper.find(HeaderTitle).text()).toBe(label);
};

describe('<HeaderTitle />', () => {
  it('should render', () => {
    const wrapper = shallow(<HeaderTitle />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display Not Found if route does not exist', () => {
    tester({
      path: '/404-this-route-does-not-exist',
      label: 'Not Found',
      curUser: null,
    });
  });

  it('should display Login text if user is not logged in and the route exists', () => {
    tester({
      path: '/',
      label: 'Login',
      curUser: null,
    });
  });

  it('should display route name if user is logged in and route exists', () => {
    Constants.ROUTES.forEach(({ path, label }) => {
      tester({ path, label, curUser: mockUser });
    });
  });
});
