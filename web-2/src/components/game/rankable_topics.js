import { h } from 'preact';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import compose from 'utilities/compose';
import { toActiveTopics } from 'utilities/state_mapping';
import { withAction, withState } from '@state';
import { updateLocalRanks } from '@actions';

import RankableTopic from 'components/game/rankable_topic';

const RankableTopics = ({ activeTopics, updateLocalRanks }) => {
  const handleDragEnd = drag => {
    const {
      source: { index: sourceIndex },
      destination: { index: destinationIndex }
    } = drag;
    updateLocalRanks(activeTopics, sourceIndex, destinationIndex);
  };

  return (
    <div class="rankable-topics">
      <DragDropContext onDragEnd={handleDragEnd}>
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
                    <div
                      class="rankable-topics__topic"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
const withActiveTopicsState = withState(
  'game.topics',
  'activeTopics',
  toActiveTopics
);
const withLocalRanksState = withState('localRanks');

// actions
const withUpdateLocalRanksAction = withAction(
  updateLocalRanks,
  'updateLocalRanks'
);

const withProps = WrappedComponent => {
  return props => {
    const { activeTopics, localRanks } = props;

    const sortedByLocalRank = activeTopics.sort(
      ({ uid: uidA }, { uid: uidB }) => localRanks[uidA] - localRanks[uidB]
    );

    return <WrappedComponent {...props} activeTopics={sortedByLocalRank} />;
  };
};

const wrappers = compose(
  withActiveTopicsState,
  withLocalRanksState,
  withUpdateLocalRanksAction,
  withProps
);

export { withProps, RankableTopics };
export default wrappers(RankableTopics);
