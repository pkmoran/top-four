import { h } from 'preact';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { withAction } from '@state';
import { showCoachmark } from '@actions';
import { logEvent } from '@services/logger';

const Coachmark = ({ children, showCoachmark, eventLabel }) => {
  const handleShowCoachmark = () => {
    showCoachmark(children);

    logEvent('coachmark', 'show_coachmark', eventLabel);
  };

  return (
    <div class="coachmark">
      <HelpIcon onClick={handleShowCoachmark} color="secondary" />
    </div>
  );
};

const withShowCoachmarkAction = withAction(showCoachmark, 'showCoachmark');

export { Coachmark };
export default withShowCoachmarkAction(Coachmark);
