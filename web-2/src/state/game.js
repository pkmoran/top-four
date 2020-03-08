import { h, createContext } from 'preact';
import { useReducer, useContext } from 'preact/hooks';

import resolve from 'utilities/resolve';
import gameStateReducer from 'state/reducer';

const GameStateContext = createContext();

const INITIAL_STATE = {};

const GameStateProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(
    gameStateReducer,
    initialState || INITIAL_STATE
  );

  const actionWrapper = action => {
    return (...args) => action.apply(null, [...args, { state, dispatch }]);
  };

  return (
    <GameStateContext.Provider value={{ state, dispatch, actionWrapper }}>
      {children}
    </GameStateContext.Provider>
  );
};

const useGameState = (mockState = {}, mockDispatch = () => {}) => {
  if (process.env.NODE_ENV !== 'test') return useContext(GameStateContext);

  const mock = { state: mockState, dispatch: mockDispatch };

  const actionWrapper = action => {
    return (...args) => action.apply(null, [...args, mock]);
  };

  return { ...mock, actionWrapper };
};

const withAction = (action, propName) => {
  return WrappedComponent => {
    return props => {
      const { actionWrapper } = useGameState();

      return (
        <WrappedComponent
          {...props}
          {...{ [propName]: actionWrapper(action) }}
        />
      );
    };
  };
};

const withState = (stateKey, stateName, mockState) => {
  return WrappedComponent => {
    return props => {
      const { state } = useGameState(mockState);

      const stateValue = stateKey ? resolve(stateKey, state) : state;

      return (
        <WrappedComponent
          {...props}
          {...{ [stateName || stateKey || 'state']: stateValue }}
        />
      );
    };
  };
};

export { GameStateProvider, useGameState, withAction, withState };
