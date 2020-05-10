const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('game_state', serializedState);
  } catch (err) {
    console.log('Error saving serialized state');
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('game_state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error loading serialized state', err);
    return undefined;
  }
};

export { saveState, loadState };
