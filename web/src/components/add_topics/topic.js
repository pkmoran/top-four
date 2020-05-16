import { h } from 'preact';
import { DeleteOutline } from '@material-ui/icons';

import { withAction } from '@state';
import { deleteTopic } from '@actions';
import { logErrorMessage } from '@services/logger';

const Topic = ({ topic: topicObj, deleteTopic }) => {
  if (!topicObj) {
    logErrorMessage('missing topic in Topic');
  }

  const { uid, topic } = topicObj;

  return (
    <div class="topic">
      <span>{topic}</span>
      <span class="topic__delete-button">
        <DeleteOutline color="secondary" onClick={() => deleteTopic(uid)} />
      </span>
    </div>
  );
};

const withDeleteTopicAction = withAction(deleteTopic, 'deleteTopic');

export { Topic };
export default withDeleteTopicAction(Topic);
