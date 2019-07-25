import React from 'react';
import { mount } from 'enzyme';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import StartGameDialog from '../StartGameDialog';

let wrapped;

beforeEach(() => {
  wrapped = mount(<StartGameDialog
    open
    startGameStep='pickTeams'
  />);
});

afterEach(() => {
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have a dialog', () => {
    expect(wrapped.find(Dialog).length).toEqual(1);
  });

  it('should have a dialog title', () => {
    expect(wrapped.find(DialogTitle).text()).toEqual('How do you want to play?');
  });
});
