import { h } from 'preact';
import { shallow } from 'enzyme';
import { Tabs, Tab } from '@material-ui/core';

import { Teams } from 'components/teams';

describe('<Teams />', () => {
  it('does not render Tabs if teams is undefined', () => {
    const wrapper = shallow(<Teams player={{}} />);

    expect(wrapper.find(Tabs).exists()).toBe(false);
  });

  it('does not render Tabs if player is undefined', () => {
    const wrapper = shallow(<Teams teams={[]} />);

    expect(wrapper.find(Tabs).exists()).toBe(false);
  });

  it('renders Tabs with the correct value', () => {
    const player = { teamUid: '23456' };
    const teams = [{ uid: '12345' }, { uid: '23456' }, { uid: '34567' }];

    const wrapper = shallow(
      <Teams teams={teams} player={player} playersByTeam={{ '23456': [] }} />
    );

    expect(wrapper.find(Tabs).props().value).toBe(1);
  });

  it('displays the number of players per team', () => {
    const teams = [
      { uid: '12345', name: 'Team 1' },
      { uid: '23456', name: 'Team 2' }
    ];
    const playersByTeam = { '12345': [{ uid: 'abcde' }, { uid: 'bcdef' }] };

    const wrapper = shallow(
      <Teams
        teams={teams}
        playersByTeam={playersByTeam}
        player={{ teamUid: '12345' }}
      />
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .props().label
    ).toBe('Team 1 (2)');
    expect(
      wrapper
        .find(Tab)
        .at(1)
        .props().label
    ).toBe('Team 2 (0)');
  });

  it('renders the players for the selected team', () => {
    const teams = [
      { uid: '12345', name: 'Team 1' },
      { uid: '23456', name: 'Team 2' }
    ];
    const playersByTeam = { '23456': [{ uid: 'abcde' }, { uid: 'bcdef' }] };

    const wrapper = shallow(
      <Teams
        teams={teams}
        playersByTeam={playersByTeam}
        player={{ teamUid: '23456' }}
      />
    );

    expect(
      wrapper.find('div').filter({ name: '12345_teamPlayer' })
    ).toHaveLength(0);
    expect(
      wrapper.find('div').filter({ name: '23456_teamPlayer' })
    ).toHaveLength(2);
  });
});
