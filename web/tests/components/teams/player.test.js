import { h } from 'preact';
import { shallow } from 'enzyme';

import { Player } from 'components/teams/player';

describe('<Player />', () => {
  it('renders players', () => {
    const wrapper = shallow(
      <Player name="Andrew" uid="12345" playerUid="23456" />
    );

    expect(wrapper.text()).toBe('Andrew');
    expect(wrapper.find('p').hasClass('player--current')).toBe(false);
  });

  it('renders the current player', () => {
    const wrapper = shallow(
      <Player name="Andrew" uid="12345" playerUid="12345" />
    );

    expect(wrapper.text()).toBe('Andrew (You)');
    expect(wrapper.find('p').hasClass('player--current')).toBe(true);
  });
});
