import { combineReducers } from 'redux';
import LandingPage from './LandingPage';
import Game from './Game';
import PickTeams from './PickTeams';
import AddTopics from './AddTopics';
import Homescreen from './Homescreen';
import RankTopics from './RankTopics';

export default combineReducers({
  LandingPage,
  Game,
  AddTopics,
  PickTeams,
  Homescreen,
  RankTopics
});
