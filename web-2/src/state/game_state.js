import { h, createContext } from 'preact';
import { useReducer, useContext } from 'preact/hooks';

const GameStateContext = createContext();

const INITIAL_STATE = { andrew: 'sutherland' };

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case 'andrewsutherland':
      console.log('gameStateReducer', action.payload);
      return state;
    default:
      return state;
  }
};

const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, INITIAL_STATE);

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

const withAction = action => {
  return WrappedComponent => {
    return props => {
      const { actionWrapper } = useGameState();

      return (
        <WrappedComponent
          {...props}
          {...{ [action.name]: actionWrapper(action) }}
        />
      );
    };
  };
};

export { gameStateReducer, GameStateProvider, useGameState, withAction };
