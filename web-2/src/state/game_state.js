import { h, createContext } from 'preact';
import { useReducer, useContext } from 'preact/hooks';

const GameStateContext = createContext();

const INITIAL_STATE = { andrew: 'sutherland' };

const gameStateReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, INITIAL_STATE);

  return (
    <GameStateContext.Provider value={[state, dispatch]}>
      {children}
    </GameStateContext.Provider>
  );
};

const useGameState = (mockState = {}, mockDispatch = () => {}) => {
  return process.env.NODE_ENV === 'test'
    ? [mockState, mockDispatch]
    : useContext(GameStateContext);
};

const withGameState = (WrappedComponent, mockState, mockDispatch) => {
  return props => {
    const [state, dispatch] = useGameState(mockState, mockDispatch);

    return <WrappedComponent {...props} state={state} dispatch={dispatch} />;
  };
};

export { gameStateReducer, GameStateProvider, useGameState, withGameState };
