import { h } from 'preact';
import { shallow } from 'enzyme';
import { Tabs, Tab } from '@material-ui/core';

import { Teams } from 'components/teams';

import Team from 'components/teams/team';

describe('<Teams />', () => {
  const teamsWithPlayers = [
    {
      uid: '12345',
      name: 'Team 1',
      players: [{ uid: 'abcde' }, { uid: 'bcdef' }]
    },
    { uid: '23456', name: 'Team 2', players: [{ uid: 'cdefg' }] }
  ];

  it('does not render Tabs if the playerTeamIndex is undefined', () => {
    const wrapper = shallow(<Teams teamsWithPlayers={teamsWithPlayers} />);

    expect(wrapper.find(Tabs).exists()).toBe(false);
  });

  it('renders Tabs with the correct value', () => {
    const wrapper = shallow(
      <Teams
        playerTeamIndex={1}
        teamsWithPlayers={[{ players: [] }, { players: [] }]}
      />
    );

    expect(wrapper.find(Tabs).props().value).toBe(1);
  });

  it('displays the number of players per team', () => {
    const wrapper = shallow(
      <Teams playerTeamIndex={1} teamsWithPlayers={teamsWithPlayers} />
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
    ).toBe('Team 2 (1)');
  });

  it('renders two teams', () => {
    const wrapper = shallow(
      <Teams playerTeamIndex={1} teamsWithPlayers={teamsWithPlayers} />
    );

    expect(wrapper.find(Team)).toHaveLength(2);
    expect(
      wrapper
        .find(Team)
        .at(0)
        .props().players
    ).toEqual(teamsWithPlayers[0].players);
    expect(
      wrapper
        .find(Team)
        .at(1)
        .props().players
    ).toEqual(teamsWithPlayers[1].players);
  });
});
