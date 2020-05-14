import { SHOW_COACHMARK, HIDE_COACHMARK } from 'actions/types';

const showCoachmark = (coachmarkContent, { dispatch }) => {
  dispatch({ type: SHOW_COACHMARK, payload: coachmarkContent });
};

const hideCoachmark = ({ dispatch }) => {
  dispatch({ type: HIDE_COACHMARK, payload: true });

  setTimeout(() => {
    dispatch({ type: HIDE_COACHMARK, payload: false });
  }, 250);
};

export { showCoachmark, hideCoachmark };

export * from '@actions/topic_packs';
export * from '@actions/pre_game';
export * from '@actions/subscribe';
export * from '@actions/in_game';
