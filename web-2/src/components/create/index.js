import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import compose from 'utilities/compose';
import { WRITE_OUR_OWN_UID, INDIVIDUALS } from 'utilities/constants';

import { withAction, withState } from '@state';
import { getTopicPacks, startGame } from '@actions';

import Logo from 'components/shared/logo';
import Slider from 'components/shared/slider';

import GameMode from 'components/create/game_mode';
import Topics from 'components/create/topics';
import Name from 'components/create/name';

const Create = ({ topicPacks, startGame }) => {
  const [gameMode, setGameMode] = useState(INDIVIDUALS);
  const [topicPackUid, setTopicPackUid] = useState(WRITE_OUR_OWN_UID);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartGame = () => {
    setLoading(true);

    startGame({ name, gameMode, topicPackUid }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div class="create">
      <div class="create__logo">
        <Logo size="small" />
      </div>
      <div class="create__container">
        <h2>Create a New Game!</h2>
        <div class="create__slider">
          <Slider>
            <GameMode gameMode={gameMode} setGameMode={setGameMode} />
            <Topics
              topicPacks={topicPacks}
              topicPackUid={topicPackUid}
              setTopicPackUid={setTopicPackUid}
            />
            <Name
              name={name}
              setName={setName}
              loading={loading}
              onStartGame={handleStartGame}
            />
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
