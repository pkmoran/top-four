const withReducerLogging = (reducer, log = console.log) => {
  return (oldState, action) => {
    const newState = reducer(oldState, action);

    if (
      process.env.NODE_ENV === 'development' ||
      (process.env.NODE_ENV === 'test' && log.mock)
    ) {
      log('##### reducer #####');
      log('old state: ', oldState);
      log('action:    ', action);
      log('new state: ', newState);
    }

    return newState;
  };
};

const tagLogger = (tag, log = console.log) => msg => {
  if (
    process.env.NODE_ENV === 'development' ||
    (process.env.NODE_ENV === 'test' && log.mock)
  )
    log(`${tag}: ${msg}`);
};

export { withReducerLogging, tagLogger };
