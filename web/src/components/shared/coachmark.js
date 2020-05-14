import { h } from 'preact';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { withAction } from '@state';
import { showCoachmark } from '@actions';

const Coachmark = ({ children, showCoachmark }) => {
  return (
    <div class="coachmark">
      <HelpIcon onClick={() => showCoachmark(children)} color="secondary" />
    </div>
  );
};

const withShowCoachmarkAction = withAction(showCoachmark, 'showCoachmark');

export { Coachmark };
export default withShowCoachmarkAction(Coachmark);
