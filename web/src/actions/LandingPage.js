import find from 'lodash/find';
import { startGameService, addPlayerService } from '../services/LandingPage';
import { getGameUidService, getPacksService } from '../services/Game';
import { getGameData } from './';
import {
  pickTeamsRoute,
  addTopicsRoute,
  homescreenRoute
} from '../services/navigation';
import { EventBuilder } from '../services/analytics';

import { WRITE_OUR_OWN_UID } from '../constants';

import {
  JOIN_GAME_ERROR,
  GAME_ID_CHANGED,
  STARTING_GAME,
  STARTED_GAME,
  START_GAME_ERROR,
  NAME_CHANGED,
  ADDED_PLAYER,
  JOINING_GAME,
  TEAM_NUMBER_CHANGED,
  SHOW_START_GAME_DIALOG,
  LOADING_TOPIC_PACKS,
  TOPIC_PACKS,
  START_GAME_STEP,
  TOPIC_PACK_CHANGED
} from './types';

export const gameIdChanged = gameId => ({
  type: GAME_ID_CHANGED,
  payload: gameId
});

export const nameChanged = name => ({
  type: NAME_CHANGED,
  payload: name
});

const loadingTopicPacks = loading => ({
  type: LOADING_TOPIC_PACKS,
  payload: loading
});

export const teamNumberChanged = numberOfTeams => ({
  type: TEAM_NUMBER_CHANGED,
  payload: numberOfTeams
});

export const showStartGameDialog = () => (dispatch, getState) => {
  dispatch(loadingTopicPacks(true));

  getPacksService().then(topicPacks => {
    dispatch(loadingTopicPacks(false));

    dispatch({
      type: TOPIC_PACKS,
      payload: topicPacks
    });

    dispatch({
      type: SHOW_START_GAME_DIALOG,
      payload: true
    });
  });
};

export const onBack = startGameStep => {
  if (startGameStep === 'pickTeams') {
    return {
      type: START_GAME_STEP,
      payload: 'yourName'
    };
  }

  if (startGameStep === 'pickTopicPacks') {
    return {
      type: START_GAME_STEP,
      payload: 'pickTeams'
    };
  }
};

export const onNext = startGameStep => {
  if (startGameStep === 'yourName') {
    return {
      type: START_GAME_STEP,
      payload: 'pickTeams'
    };
  }

  if (startGameStep === 'pickTeams') {
    return {
      type: START_GAME_STEP,
      payload: 'pickTopicPacks'
    };
  }
};

export const topicPackChanged = topicPackUid => ({
  type: TOPIC_PACK_CHANGED,
  payload: topicPackUid
});

export const hideStartGameDialog = () => ({
  type: SHOW_START_GAME_DIALOG,
  payload: false
});

export const joinGame = (gameId, history) => (dispatch, getState) => {
  if (!gameId) {
    dispatch({
      type: JOIN_GAME_ERROR,
      payload: 'Game ID cannot be empty'
    });

    return;
  }

  dispatch({
    type: JOINING_GAME
  });

  getGameUidService(gameId)
    .then(({ gameUid, noTeams, topicPack }) => {
      if (gameUid) {
        dispatch({
          type: STARTED_GAME,
          payload: { gameId, gameUid }
        });

        dispatch(getGameData(gameUid));
        addPlayerService(
          gameUid,
          getState().Game.name,
          playerUid => {
            dispatch({
              type: ADDED_PLAYER,
              payload: playerUid
            });

            if (!noTeams) {
              history.push(pickTeamsRoute(gameId));
            } else if (!topicPack) {
              history.push(addTopicsRoute(gameId));
            } else {
              history.push(homescreenRoute(gameId));
            }
          },
          () => {
            dispatch({
              type: JOIN_GAME_ERROR,
              payload: 'Could not join game'
            });
          }
        );
      }

      dispatch({
        type: JOIN_GAME_ERROR,
        payload: 'Game ID does not exist'
      });
    })
    .catch(() => {
      dispatch({
        type: JOIN_GAME_ERROR,
        payload: 'Game ID does not exist'
      });
    });
};

const startGameAnalytics = (numberOfTeams, topicPackUid, topicPacks) => {
  new EventBuilder()
    .category('game_data')
    .action('number_of_teams')
    .value(parseInt(numberOfTeams))
    .send();

  const topicPackName = find(topicPacks, {
    uid: topicPackUid
  }).rawName;

  new EventBuilder()
    .category('game_data')
    .action('topic_pack')
    .label(topicPackName)
    .send();
};

export const startGame = (numberOfTeams, topicPackUid, history) => (
  dispatch,
  getState
) => {
  dispatch({
    type: STARTING_GAME
  });

  startGameService(
    numberOfTeams,
    topicPackUid !== WRITE_OUR_OWN_UID ? topicPackUid : null,
    ({ gameId, gameUid }) => {
      startGameAnalytics(
        numberOfTeams,
        topicPackUid,
        getState().Game.topicPacks
      );

      dispatch({
        type: STARTED_GAME,
        payload: { gameId, gameUid }
      });

      dispatch(getGameData(gameUid));
      addPlayerService(
        gameUid,
        getState().Game.name,
        playerUid => {
          dispatch({
            type: ADDED_PLAYER,
            payload: playerUid
          });

          if (numberOfTeams > 0) {
            history.push(pickTeamsRoute(gameId));
          } else if (topicPackUid === WRITE_OUR_OWN_UID) {
            history.push(addTopicsRoute(gameId));
          } else {
            history.push(homescreenRoute(gameId));
          }
        },
        () => {
          dispatch({
            type: START_GAME_ERROR,
            payload: 'Error starting a new game'
          });
        }
      );
    },
    err => {
      dispatch({
        type: START_GAME_ERROR,
        payload: 'Error starting a new game'
      });
    }
  );
};
