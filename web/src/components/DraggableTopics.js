import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './styles/DraggableTopics.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 16,
  margin: '0 0 8px 0',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
});

const DraggableTopics = ({ topics, onDragEnd }) => (
  <div className="DraggableTopics">
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef}>
            {topics.map((topic, index) => (
              <Draggable key={topic.uid} draggableId={topic.uid} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    {topic.topic}
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

export default DraggableTopics;
