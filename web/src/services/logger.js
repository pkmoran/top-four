import { useEffect } from 'preact/hooks';
import ReactGA from 'react-ga';

let initialized = false;

const maybeInitialize = () => {
  if (!initialized) {
    ReactGA.initialize(process.env.TOP_FOUR_ANALYTICS_TRACKING_ID);
    initialized = true;
  }
};

const pageView = page => {
  maybeInitialize();

  if (process.env.NODE_ENV !== 'test') {
    ReactGA.pageview(page);
  }
};

const path = () => {
  const {
    location: { pathname }
  } = window;

  return pathname.substring(pathname.lastIndexOf('/'));
};

const logErrorMessage = message => {
  maybeInitialize();

  if (process.env.NODE_ENV !== 'test') {
    ReactGA.exception({
      description: `${path()} | ${message}`,
      fatal: true
    });
  }
};

const logError = error => {
  logErrorMessage(error.message);
};

const withPageView = WrappedComponent => {
  return props => {
    useEffect(() => {
      pageView(path());
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export { logError, logErrorMessage, withPageView };
