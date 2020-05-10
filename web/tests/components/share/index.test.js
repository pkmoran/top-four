import { h } from 'preact';
import { shallow } from 'enzyme';

import { withNextButton } from 'components/share';

function MockComponent() {
  return <div />;
}

describe('<Share />', () => {
  describe('withNextButton', () => {
    it('routes to teams', () => {
      const ComponentWithNextButton = withNextButton(MockComponent);
      const toTeams = jest.fn();

      const wrapper = shallow(
        <ComponentWithNextButton noTeams={false} routes={[toTeams]} />
      );

      wrapper
        .find(MockComponent)
        .props()
        .nextButton.props.onClick();

      expect(toTeams).toHaveBeenCalledTimes(1);
    });

    it('routes to add topics', () => {
      const ComponentWithNextButton = withNextButton(MockComponent);
      const toAddTopics = jest.fn();

      const wrapper = shallow(
        <ComponentWithNextButton
          noTeams={true}
          topicPack={false}
          routes={[null, toAddTopics]}
        />
      );

      wrapper
        .find(MockComponent)
        .props()
        .nextButton.props.onClick();

      expect(toAddTopics).toHaveBeenCalledTimes(1);
    });

    it('routes to the game', () => {
      const ComponentWithNextButton = withNextButton(MockComponent);
      const toGame = jest.fn();

      const wrapper = shallow(
        <ComponentWithNextButton
          noTeams={true}
          topicPack={true}
          routes={[null, null, toGame]}
        />
      );

      wrapper
        .find(MockComponent)
        .props()
        .nextButton.props.onClick();

      expect(toGame).toHaveBeenCalledTimes(1);
    });
  });
});
