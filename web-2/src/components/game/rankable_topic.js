import { h } from 'preact';
import { Paper } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const RankableTopic = ({ topic }) => {
  return (
    <Paper>
      <div class="rankable-topic">
        <span class="rankable-topic__name">{topic.topic}</span>
        <DragIndicatorIcon />
      </div>
    </Paper>
  );
};

export { RankableTopic };
export default RankableTopic;
