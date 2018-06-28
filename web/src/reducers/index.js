import { combineReducers } from 'redux';
import LandingPage from './LandingPage';
import Game from './Game';
import AddTopics from './AddTopics';

export default combineReducers({
  LandingPage,
  Game,
  AddTopics
});
