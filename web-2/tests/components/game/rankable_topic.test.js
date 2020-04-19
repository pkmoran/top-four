import { h } from 'preact';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { GAME_STATE } from 'utilities/constants';

import { RankableTopic } from 'components/game/rankable_topic';

describe('<RankableTopic />', () => {
  it('renders the drag handle while ranking', () => {
    const wrapper = shallow(
      <RankableTopic
        topic={{ status: 'active' }}
        gameState={{ state: GAME_STATE.RANKING }}
      />
    );

    expect(wrapper.containsMatchingElement(<DragIndicatorIcon />)).toBe(true);
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('renders reveal button when all locked in and ranker', () => {
    const wrapper = shallow(
      <RankableTopic
        topic={{ status: 'active' }}
        gameState={{
          state: GAME_STATE.LOCKED_IN,
          ranker: true,
          unlockedInPlayers: []
        }}
      />
    );

    expect(wrapper.containsMatchingElement(<DragIndicatorIcon />)).toBe(false);
    expect(wrapper.find(Button).filter({ name: 'reveal_button' })).toHaveLength(
      1
    );
  });

  it('calls the reveal action', () => {
    const revealTopic = jest.fn();

    const wrapper = shallow(
      <RankableTopic
        topic={{ uid: '12345', status: 'active' }}
        gameState={{
          state: GAME_STATE.LOCKED_IN,
          ranker: true,
          unlockedInPlayers: []
        }}
        revealTopic={revealTopic}
      />
    );

    wrapper.find(Button).filter({ name: 'reveal_button' }).props().onClick();

    expect(revealTopic).toHaveBeenCalledTimes(1);
    expect(revealTopic.mock.calls[0][0]).toEqual('12345');
  });
});
