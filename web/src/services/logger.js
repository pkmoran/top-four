import { useEffect } from 'preact/hooks';
import ReactGA from 'react-ga';

let initialized = false;

const maybeInitialize = () => {
  if (!initialized) {
    ReactGA.initialize(process.env.TOP_FOUR_ANALYTICS_TRACKING_ID, {
      titleCase: false,
      debug: process.env.NODE_ENV === 'development'
    });
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
  logErrorMessage(`${error.message} | ${error.stack}`);
};

const logEvent = (category, action, label, value) => {
  maybeInitialize();

  if (process.env.NODE_ENV !== 'test') {
    const event = { category, action };

    if (label) {
      event.label = label;
    }

    if (value) {
      event.value = value;
    }

    ReactGA.event(event);
  }
};

const withPageView = WrappedComponent => {
  return props => {
    useEffect(() => {
      pageView(path());
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export { logError, logEvent, logErrorMessage, withPageView };
