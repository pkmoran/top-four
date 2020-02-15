import { h } from 'preact';
import { shallow } from 'enzyme';

import {
  gameStateReducer,
  GameStateProvider,
  useGameState,
  withAction
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
    it('mocks state, dispatch and actionWrapper in a test environment', () => {
      const { state, dispatch, actionWrapper } = useGameState(
        { test: 'asdf' },
        () => 42
      );

      expect(state).toEqual({ test: 'asdf' });
      expect(dispatch()).toBe(42);
      expect(actionWrapper).toBeDefined();
      expect(actionWrapper(() => 42)()).toBe(42);
    });
  });

  describe('withAction', () => {
    it('passes props down to the wrapped component', () => {
      const namedFunction = () => 42;

      const withNamedFunction = withAction(namedFunction);
      const ComponentWithNamedFunction = withNamedFunction(MockComponent);

      const wrapper = shallow(<ComponentWithNamedFunction test="asdf" />);

      expect(wrapper.find(MockComponent).props().test).toBe('asdf');
    });

    it('passes the wrapped action prop to the wrapped component', () => {
      const namedFunction = () => 42;

      const withNamedFunction = withAction(namedFunction);
      const ComponentWithNamedFunction = withNamedFunction(MockComponent);

      const wrapper = shallow(<ComponentWithNamedFunction />);
      const action = wrapper.find(MockComponent).props().namedFunction;

      expect(action).toBeDefined();
      expect(action()).toBe(42);
    });
  });
});
