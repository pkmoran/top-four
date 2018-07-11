import { combineReducers } from 'redux';
import LandingPage from './LandingPage';
import Game from './Game';
import PickTeams from './PickTeams';
import AddTopics from './AddTopics';

export default combineReducers({
  LandingPage,
  Game,
  AddTopics,
  PickTeams
});
