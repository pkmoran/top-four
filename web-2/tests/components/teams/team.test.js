import { h } from 'preact';
import { shallow } from 'enzyme';

import { Team } from 'components/teams/team';

import Player from 'components/teams/player';

describe('<Team />', () => {
  it('renders the correct alignment class', () => {
    const wrapper = shallow(<Team players={[]} alignment="upside-down" />);

    expect(wrapper.find('div').hasClass('team--upside-down')).toBe(true);
  });

  it('renders players', () => {
    const wrapper = shallow(
      <Team players={[{ uid: '12345' }, { uid: '23456' }]} />
    );

    expect(wrapper.find(Player)).toHaveLength(2);
  });
});
