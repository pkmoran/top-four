import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import ChoiceDialog from '../ChoiceDialog';

let wrapped;

const onChoiceOne = sinon.fake();
const onChoiceTwo = sinon.fake();
const onClose = sinon.fake();

beforeEach(() => {
  wrapped = mount(<ChoiceDialog 
    open 
    titleText="Title Text"
    contentText="Content Text" 
    choiceOneText="Choice 1"
    onChoiceOne={onChoiceOne}
    choiceTwoText="Choice 2"
    onChoiceTwo={onChoiceTwo}
    onClose={onClose}/>);
});

afterEach(() => {
  onChoiceOne.resetHistory();
  onChoiceTwo.resetHistory();
  wrapped.unmount();
});

describe('the interface', () => {
  it('should have a dialog', () => {
    expect(wrapped.find(Dialog).length).toEqual(1);
  });

  it('should have a dialog title', () => {
    expect(wrapped.find(DialogTitle).text()).toEqual('Title Text');
  });

  it('should have dialog content', () => {
    const dialogContent = wrapped.find(DialogContent);
    const dialogContentText = wrapped.find(DialogContentText);

    expect(dialogContent.length).toEqual(1);
    expect(dialogContentText.length).toEqual(1);
    expect(dialogContentText.text()).toEqual('Content Text');
  });

  it('should have a choice1 button', () => {
    expect(wrapped.find(Button).at(0).text()).toEqual('Choice 1');
  });

  it('should have a choice2 button', () => {
    expect(wrapped.find(Button).at(1).text()).toEqual('Choice 2');
  });
});

describe('the choice1 button', () => {
  it('should call the choice1 callback', () => {
    wrapped.find(Button).at(0).prop('onClick')();
    expect(onChoiceOne.calledOnce).toEqual(true);
    expect(onChoiceTwo.notCalled).toEqual(true);
  });
});

describe('the choice2 button', () => {
  it('should call the choice2 callback', () => {
    wrapped.find(Button).at(1).prop('onClick')();
    expect(onChoiceOne.notCalled).toEqual(true);
    expect(onChoiceTwo.calledOnce).toEqual(true);
  });
});
