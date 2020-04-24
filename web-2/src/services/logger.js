import firebase from 'firebase/app';
import 'firebase/analytics';

const logError = (error, path) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.log('logError', error, path);
  } else {
    firebase.analytics().logEvent('error', { path, error });
  }
};

export { logError };
