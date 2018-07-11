import { TEAM_NAME_CHANGED, ADDING_TEAM, ADDED_TEAM } from '../actions/types';

const INITIAL_STATE = {
  teamName: '',
  addTeamEnabled: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAM_NAME_CHANGED:
      return { ...state, teamName: action.payload, addTeamEnabled: !action.payload };
    case ADDING_TEAM:
      return {
        ...state,
        teamName: '',
        loading: true,
        addTeamEnabled: false
      };
    case ADDED_TEAM:
      return { ...state, loading: false };
    default:
      return state;
  }
};
