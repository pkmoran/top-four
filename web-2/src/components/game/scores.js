import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from '@material-ui/core';

import cx from 'utilities/cx';
import compose from 'utilities/compose';
import { withAction, withState } from '@state';
import { togglePlayerActive } from '@actions';
import { toAllPlayersWithScores } from 'utilities/state_mapping';

const Scores = ({ playerScores, playerUid, togglePlayerActive }) => {
  const [editing, setEditing] = useState(false);

  const players = editing
    ? playerScores
    : playerScores.filter(({ active }) => active);

  return (
    <div class="scores">
      <h1>Scores!</h1>

      <div class="scores__players">
        {players.map(({ uid, name, score, active }, index) => {
          const playerNameClasses = cx('scores__player-score--name', {
            inactive: !active
          });

          return (
            <div class="scores__player">
              <div class="scores__player-score">
                <span class="scores__player-score--index">{`${
                  index + 1
                }.`}</span>
                <span class={playerNameClasses}>{name}</span>
                <span class="scores__player-score--score">{score}</span>
              </div>
              {editing && (
                <span class="scores__player-score--deactive">
                  <Button
                    variant={active ? 'outlined' : 'contained'}
                    color="secondary"
                    onClick={() => togglePlayerActive(uid)}
                    disabled={uid === playerUid}
                  >
                    {active ? 'Deactivate' : 'Activate'}
                  </Button>
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div class="scores__footer">
        <Button
          variant={editing ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Done' : 'Edit Players'}
        </Button>

        <a
          class="scores__feedback"
          href="mailto:feedback@topfour.io"
          target="_blank"
        >
          feedback@topfour.io
        </a>
      </div>
    </div>
  );
};

// state
const withPlayerScoresState = withState(
  'game',
  'playerScores',
  toAllPlayersWithScores
);
const withPlayerUidState = withState('playerUid');

// actions
const withTogglePlayerActiveAction = withAction(
  togglePlayerActive,
  'togglePlayerActive'
);

const wrappers = compose(
  withPlayerScoresState,
  withPlayerUidState,
  withTogglePlayerActiveAction
);

export { Scores };
export default wrappers(Scores);
