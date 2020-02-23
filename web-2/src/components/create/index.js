import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import compose from 'utilities/compose';
import { WRITE_OUR_OWN_UID, TEAMS } from 'utilities/constants';

import { withAction, withState } from 'state/game_state';
import { startGame, getTopicPacks } from 'actions/game';

import Slider from 'components/shared/slider';

import GameMode from 'components/create/game_mode';
import Topics from 'components/create/topics';
import Name from 'components/create/name';

const Create = ({ startGame, topicPacks }) => {
  const [gameMode, setGameMode] = useState(TEAMS);
  const [topicPackUid, setTopicPackUid] = useState(WRITE_OUR_OWN_UID);
  const [name, setName] = useState('');

  const handleStartGame = () => {
    startGame({ name, gameMode, topicPackUid });
  };

  const confirmButton = (
    <button class="btn btn__primary" onClick={handleStartGame}>
      Start Game!
    </button>
  );

  return (
    <div class="create">
      <h2>Top Four</h2>
      <Slider confirmContent={confirmButton}>
        <GameMode gameMode={gameMode} setGameMode={setGameMode} />
        <Topics
          topicPacks={topicPacks}
          topicPackUid={topicPackUid}
          setTopicPackUid={setTopicPackUid}
        />
        <Name name={name} setName={setName} />
      </Slider>
    </div>
  );
};

// state
const withTopicPacksState = withState('topicPacks');

// actions
const withStartGameAction = withAction(startGame, 'startGame');
const withGetTopicPacksAction = withAction(getTopicPacks, 'getTopicPacks');

// effects
const withEffect = WrappedComponent => {
  return props => {
    const { getTopicPacks } = props;

    useEffect(() => {
      getTopicPacks();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

const wrappers = compose(
  withStartGameAction,
  withGetTopicPacksAction,
  withTopicPacksState,
  withEffect
);

export { Create };
export default wrappers(Create);
