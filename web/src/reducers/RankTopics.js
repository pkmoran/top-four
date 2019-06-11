import map from 'lodash/map';
import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import forEach from 'lodash/forEach';
import find from 'lodash/find';

import {
  UPDATE_MY_RANKS,
  SHOW_LOCK_IN_DIALOG,
  RESET_LOCAL_RANKING,
  LOCKED_IN,
  SHOW_REVEAL_DIALOG,
  HIDE_REVEAL_DIALOG,
  NEW_GAME_DATA,
  SKIP_SCORE
} from '../actions/types';

const INITIAL_STATE = {
  localRanks: null,
  topics: [],
  roundScore: 0,
  showDialog: false,
  lockedIn: false,
  showRevealDialog: false,
  pendingRevealAction: () => {},
  skipScore: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MY_RANKS:
      return {
        ...state,
        localRanks: action.payload,
        topics: sortAndCorrectTopics(state.topics, action.payload)
      };
    case SHOW_LOCK_IN_DIALOG:
      return { ...state, showDialog: action.payload };
    case RESET_LOCAL_RANKING:
      return INITIAL_STATE;
    case LOCKED_IN:
      return { ...state, lockedIn: true };
    case SHOW_REVEAL_DIALOG:
      return {
        ...state,
        showRevealDialog: true,
        pendingRevealAction: action.payload
      };
    case HIDE_REVEAL_DIALOG:
      return {
        ...state,
        showRevealDialog: false,
        pendingRevealAction: INITIAL_STATE.pendingRevealAction
      };
    case NEW_GAME_DATA:
      if (!action.payload.state || action.payload.state === '') {
        return state;
      }

      const topics = map(action.payload.topics, (topic, uid) => ({
        ...topic,
        uid
      }));
      const activeTopics = filter(
        topics,
        topic => topic.status === 'active' || topic.status === 'ranked'
      );

      let localRanks = state.localRanks;

      if (!localRanks) {
        localRanks = reduce(
          activeTopics,
          (result, value, index) => ({ ...result, [value.uid]: index }),
          {}
        );
      }

      const sortedAndCorrectedTopics = sortAndCorrectTopics(
        activeTopics,
        localRanks
      );
      calculateTopicsPercentageCorrect(
        sortedAndCorrectedTopics,
        action.payload.guesses
      );
      const roundScore = filter(sortedAndCorrectedTopics, { isCorrect: true })
        .length;

      return {
        ...state,
        localRanks,
        topics: sortedAndCorrectedTopics,
        roundScore
      };
    case SKIP_SCORE:
      return {
        ...state,
        skipScore: true
      };
    default:
      return state;
  }
};

const sortAndCorrectTopics = (topics, localRanks) => {
  const sortedTopics = sortBy(topics, [topic => localRanks[topic.uid]]);

  forEach(sortedTopics, (topic, index) => {
    topic.isCorrect = index === topic.rank;
    topic.correctTopic = Object.assign(
      {},
      find(topics, topic => index === topic.rank)
    );
  });

  return sortedTopics;
};

const calculateTopicsPercentageCorrect = (topics, guesses) => {
  forEach(topics, topic => {

    // default to -1 to account for the ranking player being counted as a guess
    let numberOfPlayers = -1;
    let numberCorrect = 0;

    forEach(guesses, playerGuess => {
      numberOfPlayers += 1;

      if (playerGuess[topic.uid] === topic.rank) {
        numberCorrect += 1;
      }
    });

    topic.percentCorrect = numberCorrect / numberOfPlayers;
  });
};
