import { h } from 'preact';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import compose from 'utilities/compose';
import { toActiveTopics } from 'utilities/state_mapping';
import { withState } from 'state/game';

import RankableTopic from 'components/game/rankable_topic';

const RankableTopics = ({ activeTopics }) => {
  return (
    <div class="rankable-topics">
      <DragDropContext>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {activeTopics.map((topic, index) => (
                <Draggable
                  key={topic.uid}
                  draggableId={topic.uid}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div class="rankable-topics__topic">
                      <RankableTopic topic={topic} provided={provided} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

// state
const withActiveTopics = withState(
  'game.topics',
  'activeTopics',
  toActiveTopics
);

const wrappers = compose(withActiveTopics);

export { RankableTopics };
export default wrappers(RankableTopics);
