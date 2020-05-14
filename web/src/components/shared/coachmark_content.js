import { h } from 'preact';
import { useState } from 'preact/hooks';

import cx from 'utilities/cx';
import { withAction } from '@state';
import { hideCoachmark } from '@actions';

const CoachmarkContent = ({ content, hideCoachmark }) => {
  const coachmarkClasses = cx('coachmark-content', {
    'coachmark-content--fade-in': !!content,
    'coachmark-content--fade-out': !content
  });

  return (
    <div class={coachmarkClasses} onClick={() => hideCoachmark()}>
      {content}
    </div>
  );
};

const withHideCoachmarkAction = withAction(hideCoachmark, 'hideCoachmark');

export { CoachmarkContent };
export default withHideCoachmarkAction(CoachmarkContent);
