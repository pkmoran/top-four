import { TEAM_NAME_CHANGED, ADDED_TEAM, TEAM_SELECTED, JOINING_TEAM, JOINED_TEAM } from '../actions/types';

const INITIAL_STATE = {
  teamName: '',
  addTeamEnabled: false,
  selectedTeam: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_NAME_CHANGED:
      return { ...state, teamName: action.payload, addTeamEnabled: !!action.payload };
    case ADDED_TEAM:
      return { ...state, teamName: '', addTeamEnabled: false };
    case TEAM_SELECTED:
      return { ...state, selectedTeam: action.payload };
    case JOINING_TEAM:
      return { ...state, loading: true };
    case JOINED_TEAM:
      return { ...state, loading: false };
    default:
      return state;
  }
};
