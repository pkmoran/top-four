import { h } from 'preact';
import { shallow } from 'enzyme';
import { Tabs, Tab } from '@material-ui/core';

import { withPropsCombiner, Teams } from 'components/teams';

import Team from 'components/teams/team';

function MockComponent() {
  return <div />;
}

describe('<Teams />', () => {
  const teamsWithPlayers = [
    {
      uid: '12345',
      name: 'Team 1',
      players: [{ uid: 'abcde' }, { uid: 'bcdef' }],
    },
    { uid: '23456', name: 'Team 2', players: [{ uid: 'cdefg' }] },
  ];

  it('does not render Tabs if the playerTeamIndex is undefined', () => {
    const wrapper = shallow(
      <Teams teamsWithPlayers={teamsWithPlayers} routes={[]} />
    );

    expect(wrapper.find(Tabs).exists()).toBe(false);
  });

  it('renders Tabs with the correct value', () => {
    const wrapper = shallow(
      <Teams
        playerTeamIndex={1}
        teamsWithPlayers={[{ players: [] }, { players: [] }]}
        routes={[]}
      />
    );

    expect(wrapper.find(Tabs).props().value).toBe(1);
  });

  it('displays the number of players per team', () => {
    const wrapper = shallow(
      <Teams
        playerTeamIndex={1}
        teamsWithPlayers={teamsWithPlayers}
        routes={[]}
      />
    );

    expect(wrapper.find(Tab).at(0).props().label).toBe('Team 1 (2)');
    expect(wrapper.find(Tab).at(1).props().label).toBe('Team 2 (1)');
  });

  it('renders two teams', () => {
    const wrapper = shallow(
      <Teams
        playerTeamIndex={1}
        teamsWithPlayers={teamsWithPlayers}
        routes={[]}
      />
    );

    expect(wrapper.find(Team)).toHaveLength(2);
    expect(wrapper.find(Team).at(0).props().players).toEqual(
      teamsWithPlayers[0].players
    );
    expect(wrapper.find(Team).at(1).props().players).toEqual(
      teamsWithPlayers[1].players
    );
  });

  describe('withPropsCombiner', () => {
    it('calculates the player team index', () => {
      const ComponentWithProps = withPropsCombiner(MockComponent);

      const wrapper = shallow(
        <ComponentWithProps
          teams={[{ uid: '12345' }, { uid: '23456' }]}
          player={{ teamUid: '23456' }}
          playersByTeam={{}}
          routes={[]}
        />
      );

      expect(wrapper.find(MockComponent).props().playerTeamIndex).toBe(1);
    });

    it('groups players with their team', () => {
      const ComponentWithProps = withPropsCombiner(MockComponent);

      const wrapper = shallow(
        <ComponentWithProps
          teams={[{ uid: '12345' }, { uid: '23456' }]}
          playersByTeam={{
            '12345': [{ uid: 'abcde' }],
            '23456': [{ uid: 'bcdef' }, { uid: 'cdefg' }],
          }}
          routes={[]}
        />
      );

      expect(wrapper.find(MockComponent).props().teamsWithPlayers).toEqual([
        { uid: '12345', players: [{ uid: 'abcde' }] },
        { uid: '23456', players: [{ uid: 'bcdef' }, { uid: 'cdefg' }] },
      ]);
    });

    describe('nextButton', () => {
      it('routes to add topics', () => {
        const ComponentWithProps = withPropsCombiner(MockComponent);
        const toAddTopics = jest.fn();

        const wrapper = shallow(
          <ComponentWithProps
            topicPack={false}
            routes={[toAddTopics]}
            teams={[]}
          />
        );

        wrapper.find(MockComponent).props().nextButton.props.onClick();

        expect(toAddTopics).toHaveBeenCalledTimes(1);
      });

      it('routes to the game', () => {
        const ComponentWithProps = withPropsCombiner(MockComponent);
        const toGame = jest.fn();

        const wrapper = shallow(
          <ComponentWithProps
            topicPack={true}
            routes={[null, toGame]}
            teams={[]}
          />
        );

        wrapper.find(MockComponent).props().nextButton.props.onClick();

        expect(toGame).toHaveBeenCalledTimes(1);
      });
    });
  });
});
