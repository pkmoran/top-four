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

const logError = (error, path) => {
  maybeInitialize();

  if (process.env.NODE_ENV !== 'test') {
    ReactGA.exception({
      description: `${path} | ${error.message}`,
      fatal: true
    });
  }
};

const withPageView = WrappedComponent => {
  return props => {
    useEffect(() => {
      pageView(window.location.pathname);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export { logError, withPageView };
