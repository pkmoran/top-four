import { h } from 'preact';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { GAME_STATE } from 'utilities/constants';

import CorrectLogo from 'components/shared/correct_logo';
import IncorrectLogo from 'components/shared/incorrect_logo';

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

  describe('correct percent', () => {
    it('renders for the ranker', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ status: 'ranked', correctPercent: '12%' }}
          gameState={{
            state: GAME_STATE.LOCKED_IN,
            ranker: true
          }}
        />
      );

      expect(wrapper.find('span[name="percent"]').text()).toBe('12%');
    });

    it('does not render for the guesser', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ status: 'ranked', correctPercent: '12%' }}
          gameState={{
            state: GAME_STATE.LOCKED_IN,
            ranker: false
          }}
        />
      );

      expect(wrapper.find('span[name="percent"]').length).toBe(0);
    });
  });

  describe('correct logo', () => {
    it('renders for the guesser', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ correctTopic: { status: 'ranked' }, rank: 1, localRank: 1 }}
          gameState={{ ranker: false }}
        />
      );

      expect(wrapper.find(CorrectLogo).length).toBe(1);
    });

    it('does not render for the ranker', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ correctTopic: { status: 'ranked' }, rank: 1, localRank: 1 }}
          gameState={{ ranker: true }}
        />
      );

      expect(wrapper.find(CorrectLogo).length).toBe(0);
    });
  });

  describe('incorrect logo', () => {
    it('renders for the guesser', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ correctTopic: { status: 'ranked' }, rank: 1, localRank: 2 }}
          gameState={{ ranker: false }}
        />
      );

      expect(wrapper.find(IncorrectLogo).length).toBe(1);
    });

    it('does not render for the ranker', () => {
      const wrapper = shallow(
        <RankableTopic
          topic={{ correctTopic: { status: 'ranked' }, rank: 1, localRank: 2 }}
          gameState={{ ranker: true }}
        />
      );

      expect(wrapper.find(IncorrectLogo).length).toBe(0);
    });
  });
});
