import { h } from 'preact';
import { shallow, mount } from 'enzyme';

import {
  gameStateReducer,
  GameStateProvider,
  useGameState,
  withGameState
} from 'state/game_state';

function MockComponent() {
  return <div />;
}

describe('game state', () => {
  describe('gameStateReducer', () => {
    it('returns state for unknown actions', () => {
      const state = gameStateReducer({ test: 'asdf' }, 'DUMMY_ACTION');

      expect(state).toEqual({ test: 'asdf' });
    });
  });

  describe('<GameStateProvider />', () => {
    it('renders children', () => {
      const wrapper = shallow(
        <GameStateProvider>
          <MockComponent />
        </GameStateProvider>
      );

      expect(wrapper.contains(<MockComponent />)).toBeTruthy();
    });
  });

  describe('useGameState', () => {
    it('mocks state and dispatch in a test environment', () => {
      const [state, dispatch] = useGameState({ test: 'asdf' }, () => 42);

      expect(state).toEqual({ test: 'asdf' });
      expect(dispatch()).toBe(42);
    });
  });

  describe('withGameState', () => {
    it('passes props to the wrapped component', () => {
      const ComponentWithGameState = withGameState(MockComponent);
      const wrapper = shallow(<ComponentWithGameState test="asdf" />);

      expect(wrapper.find(MockComponent).props().test).toBe('asdf');
    });

    it('passes state and dispatch to the wrapped component', () => {
      const mockState = { test: 'asdf' };
      const ComponentWithGameState = withGameState(MockComponent, mockState);
      const wrapper = shallow(<ComponentWithGameState />);

      expect(wrapper.find(MockComponent).props().state).toEqual({
        test: 'asdf'
      });
    });
  });
});
