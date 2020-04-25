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
        <IconButton color="secondary" onClick={() => deleteTopic(uid)}>
          <DeleteOutline />
        </IconButton>
      </span>
    </div>
  );
};

const withDeleteTopicAction = withAction(deleteTopic, 'deleteTopic');

export { Topic };
export default withDeleteTopicAction(Topic);
