import { TEAM_NAME_CHANGED, ADDED_TEAM } from '../actions/types';

const INITIAL_STATE = {
  teamName: '',
  addTeamEnabled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_NAME_CHANGED:
      return { ...state, teamName: action.payload, addTeamEnabled: !!action.payload };
    case ADDED_TEAM:
      return { ...state, teamName: '', addTeamEnabled: false };
    default:
      return state;
  }
};
