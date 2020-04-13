import { h } from 'preact';
import { Paper } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const RankableTopic = ({ topic, provided }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Paper>
        <div class="rankable-topic">
          <span class="rankable-topic__name">{topic.topic}</span>
          <DragIndicatorIcon />
        </div>
      </Paper>
    </div>
  );
};

export { RankableTopic };
export default RankableTopic;
