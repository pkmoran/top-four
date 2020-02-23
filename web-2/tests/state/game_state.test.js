import { h } from 'preact';
import { shallow } from 'enzyme';

import {
  GameStateProvider,
  useGameState,
  withAction,
  withState
} from 'state/game_state';

function MockComponent() {
  return <div />;
}

describe('game state', () => {
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

      const withNamedFunction = withAction(namedFunction, 'namedFunction');
      const ComponentWithNamedFunction = withNamedFunction(MockComponent);

      const wrapper = shallow(<ComponentWithNamedFunction />);
      const action = wrapper.find(MockComponent).props().namedFunction;

      expect(action).toBeDefined();
      expect(action()).toBe(42);
    });
  });

  describe('withState', () => {
    const MOCK_STATE = { nested: { value: 42 }, root: 'asdf' };

    it('passes props down to the wrapped component', () => {
      const withStateWrapper = withState('state', 'stateName', MOCK_STATE);
      const ComponentWithState = withStateWrapper(MockComponent);

      const wrapper = shallow(<ComponentWithState test="asdf" />);

      expect(wrapper.find(MockComponent).props().test).toBe('asdf');
    });

    it('passes root state to the wrapped component', () => {
      const withRootState = withState('root', 'stateName', MOCK_STATE);
      const ComponentWithState = withRootState(MockComponent);

      const wrapper = shallow(<ComponentWithState />);

      expect(wrapper.find(MockComponent).props().stateName).toBe('asdf');
    });

    it('passes nested state to the wrapped component', () => {
      const withNestedState = withState(
        'nested.value',
        'stateName',
        MOCK_STATE
      );
      const ComponentWithState = withNestedState(MockComponent);

      const wrapper = shallow(<ComponentWithState />);

      expect(wrapper.find(MockComponent).props().stateName).toBe(42);
    });

    it('passes null to the wrapped component if state does not exist', () => {
      const withNullState = withState(
        'andrew.sutherland',
        'stateName',
        MOCK_STATE
      );
      const ComponentWithState = withNullState(MockComponent);

      const wrapper = shallow(<ComponentWithState />);

      expect(wrapper.find(MockComponent).props().stateName).toBeNull();
    });

    it('defaults the state name to the state key', () => {
      const withDefaultStateName = withState('nested.value', null, MOCK_STATE);
      const ComponentWithState = withDefaultStateName(MockComponent);

      const wrapper = shallow(<ComponentWithState />);

      expect(wrapper.find(MockComponent).props()['nested.value']).toBe(42);
    });
  });
});
