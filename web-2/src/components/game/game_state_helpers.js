import { h } from 'preact';

import { GAME_STATE } from 'utilities/constants';

import ConfirmButton from 'components/game/confirm_button';

const footerContentForState = ({
  gameState: { state, unlockedInPlayers, nextRanker },
  startRound,
  lockIn
}) => {
  switch (state) {
    case GAME_STATE.BETWEEN_ROUNDS:
      if (nextRanker.isThisPlayer)
        return (
          <ConfirmButton
            prefix="Your turn to rank!"
            confirmText="Start round!"
            confirmAction={startRound}
          />
        );

      return <span>{`Tell ${nextRanker.name} to start the next round!`}</span>;
    case GAME_STATE.RANKING:
      return (
        <ConfirmButton
          prefix="Feeling confident???"
          confirmText="Lock in!"
          confirmAction={lockIn}
        />
      );
    case GAME_STATE.LOCKED_IN:
      if (unlockedInPlayers.length === 0)
        return <span>Everyone's locked in!</span>;

      if (unlockedInPlayers.length === 1)
        return (
          <span>{`Waiting on ${unlockedInPlayers[0].name} to lock in!`}</span>
        );

      return (
        <span>{`Waiting on ${unlockedInPlayers.length} players to lock in!`}</span>
      );
  }
};

const bodyState = ({ gameState: { state, ranker }, rankingPlayer }) => {
  switch (state) {
    case GAME_STATE.BETWEEN_ROUNDS:
      return {
        header: 'Waiting!',
        subheader: '...for someone to start ranking.'
      };
    case GAME_STATE.RANKING:
    case GAME_STATE.LOCKED_IN:
      if (ranker)
        return {
          header: 'Rank!',
          subheader: '...the following topics, best to worst.'
        };

      return {
        header: 'Guess!',
        subheader: `...how ${rankingPlayer.name} would rank the following topics.`
      };
  }
};

export { footerContentForState, bodyState };
