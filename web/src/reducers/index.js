import { combineReducers } from 'redux';

import LandingPage from './LandingPage';
import Game from './Game';
import AddTopics from './AddTopics';
import Homescreen from './Homescreen';
import RankTopics from './RankTopics';

export default combineReducers({
  LandingPage,
  Game,
  AddTopics,
  Homescreen,
  RankTopics
});
