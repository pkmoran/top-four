import React from 'react';
import { mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Root from '../../Root';
import LandingPage from '../LandingPage';

let wrapped;

beforeEach(() => {
  wrapped = mount(<LandingPage showDialog={false}/>);
});

afterEach(() => {
  wrapped.unmount();
});

it('should have a header, two buttons and two text fields', () => {
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find(Button).length).toEqual(2);
  expect(wrapped.find(TextField).length).toEqual(1);
});
