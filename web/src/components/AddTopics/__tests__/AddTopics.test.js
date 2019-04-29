import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Button from '@material-ui/core/Button';

import Root from '../../Root';
import AddTopics from '../AddTopics';

let wrapped;
const INITIAL_STATE = {
  Game: {
    gameUid: 'asdf'
  }
};

beforeEach(() => {
  wrapped = mount(<Root initialState={INITIAL_STATE}><AddTopics /></Root>);
});

afterEach(() => {
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have a header', () => {
    expect(wrapped.find('h1').text()).toEqual('Add Topics!');
  });

  it('should have a done button', () => {
    expect(wrapped.find(Button).at(1).text()).toEqual('Done!');
  });
});
