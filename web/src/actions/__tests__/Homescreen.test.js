import { showStartRoundDialog, hideStartRoundDialog } from '../Homescreen';
import { SHOW_START_ROUND_DIALOG } from '../types';

it('should dispatch a show action', () => {
  const action = showStartRoundDialog();
  expect(action.type).toEqual(SHOW_START_ROUND_DIALOG);
  expect(action.payload).toEqual(true);
});

it('should dispatch a hide action', () => {
  const action = hideStartRoundDialog();
  expect(action.type).toEqual(SHOW_START_ROUND_DIALOG);
  expect(action.payload).toEqual(false);
});
