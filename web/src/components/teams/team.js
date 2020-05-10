import { h } from 'preact';

import cx from 'utilities/cx';

import Player from 'components/teams/player';

const Team = ({ players, alignment }) => {
  const classes = cx('team', `team--${alignment}`);

  return (
    <div class={classes}>
      {players.map(({ name, uid }) => (
        <Player name={name} uid={uid} />
      ))}
    </div>
  );
};

export { Team };
export default Team;
