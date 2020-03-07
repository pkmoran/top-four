import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Button, CircularProgress } from '@material-ui/core';

import compose from 'utilities/compose';
import { WRITE_OUR_OWN_UID, TEAMS } from 'utilities/constants';

import { withAction, withState } from 'state/game';
import { startGame, getTopicPacks } from 'actions/game';

import Logo from 'components/shared/logo';
import Slider from 'components/shared/slider';

import GameMode from 'components/create/game_mode';
import Topics from 'components/create/topics';
import Name from 'components/create/name';

const Create = ({ startGame, topicPacks }) => {
  const [gameMode, setGameMode] = useState(TEAMS);
  const [topicPackUid, setTopicPackUid] = useState(WRITE_OUR_OWN_UID);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const disabled = loading || !name;

  const handleStartGame = () => {
    setLoading(true);

    startGame({ name, gameMode, topicPackUid }).catch(() => {
      setLoading(false);
    });
  };

  const confirmButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={handleStartGame}
      disabled={disabled}
    >
      {!loading && 'Start game!'}
      {loading && <CircularProgress size={24} />}
    </Button>
  );

  return (
    <div class="create">
      <div class="create__logo">
        <Logo size="small" />
      </div>
      <div class="create__container">
        <h2>Create a New Game!</h2>
        <div class="create__slider">
          <Slider confirmContent={confirmButton} scrollableSteps={[1]}>
            <GameMode gameMode={gameMode} setGameMode={setGameMode} />
            <Topics
              topicPacks={topicPacks}
              topicPackUid={topicPackUid}
              setTopicPackUid={setTopicPackUid}
            />
            <Name name={name} setName={setName} />
          </Slider>
        </div>
      </div>
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
