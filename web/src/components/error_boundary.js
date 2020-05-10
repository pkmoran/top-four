import { h, Component } from 'preact';
import { Button } from '@material-ui/core';

import { logError } from '@services/logger';

import Logo from 'components/shared/logo';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'production') console.log(error);

    logError(error);
  }

  handleClick = () => {
    window.location.href = '/';
  };

  render({ children }, { hasError }) {
    if (!hasError) return children;

    return (
      <div class="error">
        <div>
          <Logo size="small" />
        </div>
        <h1>oops...</h1>
        <div class="error__content">
          <span>...we're embarassed, but something went wrong.</span>
          <span>Maybe try refreshing the page?</span>
          <span>
            Or{' '}
            <span class="error__home-button">
              <Button
                variant="contained"
                disableElevation
                onClick={this.handleClick}
              >
                return home
              </Button>
            </span>{' '}
            and rejoin the fun!
          </span>
        </div>
      </div>
    );
  }
}

export { ErrorBoundary };
export default ErrorBoundary;
