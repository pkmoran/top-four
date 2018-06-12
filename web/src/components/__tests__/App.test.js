import React from 'react';
import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
import Root from '../Root';
import App from '../App';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Root><App /></Root>);
});

afterEach(() => {
  wrapped.unmount();
});

it('contains one route', () => {
  expect(wrapped.find(Route).length).toEqual(1);
});
