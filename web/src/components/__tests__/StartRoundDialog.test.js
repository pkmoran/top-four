import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import StartRoundDialog from '../StartRoundDialog';

let wrapped;
const onYes = sinon.fake();
const onNo = sinon.fake();

beforeEach(() => {
  wrapped = mount(<StartRoundDialog open playerName="Player 1" onYes={onYes} onNo={onNo} />);
});

afterEach(() => {
  onYes.resetHistory();
  onNo.resetHistory();
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have a dialog', () => {
    expect(wrapped.find(Dialog).length).toEqual(1);
  });

  it('should have a dialog title', () => {
    expect(wrapped.find(DialogTitle).text()).toEqual('Start a new round?');
  });

  it('should have dialog content', () => {
    const dialogContent = wrapped.find(DialogContent);
    const dialogContentText = wrapped.find(DialogContentText);

    expect(dialogContent.length).toEqual(1);
    expect(dialogContentText.length).toEqual(1);
    expect(dialogContentText.text()).toEqual('Player 1, you\'re up! Is the group ready?');
  });

  it('should have a yes button', () => {
    expect(wrapped.find(Button).at(0).text()).toEqual('Yep!');
  });

  it('should have a no button', () => {
    expect(wrapped.find(Button).at(1).text()).toEqual('Nope!');
  });
});

describe('the yes button', () => {
  it('should call the onYes callback', () => {
    wrapped.find(Button).at(0).prop('onClick')();
    expect(onYes.calledOnce).toEqual(true);
    expect(onNo.notCalled).toEqual(true);
  });
});

describe('the no button', () => {
  it('should call the onNo callback', () => {
    wrapped.find(Button).at(1).prop('onClick')();
    expect(onYes.notCalled).toEqual(true);
    expect(onNo.calledOnce).toEqual(true);
  });
});
