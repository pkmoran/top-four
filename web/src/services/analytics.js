import ReactGA from 'react-ga';

export const init = () => {
  let trackingId;
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    trackingId = process.env.REACT_APP_DEV_ANALYTICS_TRACKING_ID;
  } else {
    trackingId = process.env.REACT_APP_PRODUCTION_ANALYTICS_TRACKING_ID;
  }

  const options = { titleCase: false };

  if (process.env.NODE_ENV === 'development') {
    options.debug = true;
  }

  ReactGA.initialize(trackingId, options);
};

export const pageView = page => {
  if (process.env.NODE_ENV !== 'test') {
    ReactGA.pageview(page);
  }
};

export class EventBuilder {
  constructor() {
    this.event = {};
  }

  category(category) {
    this.event = { ...this.event, category };
    return this;
  }

  action(action) {
    this.event = { ...this.event, action };
    return this;
  }

  label(label) {
    this.event = { ...this.event, label };
    return this;
  }

  value(value) {
    this.event = { ...this.event, value };
    return this;
  }

  send() {
    if (process.env.NODE_ENV !== 'test') {
      ReactGA.event(this.event);
    }
  }
}
