import { h } from 'preact';
import { IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

import { withAction } from '@state';
import { deleteTopic } from '@actions';

const Topic = ({ topic: { uid, topic }, deleteTopic }) => {
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
