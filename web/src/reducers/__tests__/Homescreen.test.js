import Homescreen, { INITIAL_STATE } from '../Homescreen';

import {
  SHOW_START_ROUND_DIALOG
} from '../../actions/types';

it('should set the show dialog property to true', () => {
  const newState = Homescreen(INITIAL_STATE, {
    type: SHOW_START_ROUND_DIALOG,
    payload: true
  });
  expect(newState.showDialog).toEqual(true);
});

it('should set the show dialog property to false', () => {
  const newState = Homescreen(INITIAL_STATE, {
    type: SHOW_START_ROUND_DIALOG,
    payload: false
  });
  expect(newState.showDialog).toEqual(false);
});
