import { h } from 'preact';

import cx from 'utilities/cx';
import { withState } from 'state/game';

const Player = ({ name, uid, playerUid }) => {
  const currentPlayer = uid === playerUid;

  const classes = cx('player', {
    'player--current': currentPlayer
  });

  return <p class={classes}>{`${name}${currentPlayer ? ' (You)' : ''}`}</p>;
};

const withPlayerUidState = withState('playerUid');

export { Player };
export default withPlayerUidState(Player);
