import React from 'react';
import { mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Root from '../Root';
import LandingPage from '../LandingPage';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Root><LandingPage /></Root>);
});

afterEach(() => {
  wrapped.unmount();
});

it('should have a header, two buttons and two text fields', () => {
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find(Button).length).toEqual(2);
  expect(wrapped.find(TextField).length).toEqual(2);
});

describe('the join game text field', () => {
  it('can be typed into', () => {
    wrapped.find(TextField).at(1)
      .prop('onChange')({ target: { value: 'asdf' } });
    wrapped.update();

    expect(wrapped.find(TextField).at(1).prop('value')).toEqual('asdf');
  });

  describe('error', () => {
    beforeEach(() => {
      wrapped.find(Button).at(1)
        .prop('onClick')();
      wrapped.update();
    });
  });
});

describe('the name text field', () => {
  it('can be typed into', () => {
    wrapped.find(TextField).at(1)
      .prop('onChange')({ target: { value: 'asdf' } });
    wrapped.update();

    expect(wrapped.find(TextField).at(1).prop('value')).toEqual('asdf');
  });
});
