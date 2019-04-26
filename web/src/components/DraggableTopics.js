import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './styles/DraggableTopics.css';

class DraggableTopics extends Component {
  constructor(props) {
    super(props);
  }

  getItemStyle(isDragging, draggableStyle, state, topic) {
    let background;

    if (isDragging) {
      background = 'lightgreen';
    } else if (state === 'ranked') {
      if (topic.isCorrect) {
        background = 'green';
      } else {
        background = 'red';
      }
    } else {
      background = 'grey';
    }
  
    return {
      userSelect: 'none',
      padding: 16,
      margin: '0 0 8px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background,
      ...draggableStyle
    }
  }

  getTopicTitle(topic, state) {
    if (state === 'ranked' && !topic.isCorrect) {
      return (
        <span><strike>{topic.topic}</strike> {topic.correctTopic.topic}</span>
      );
    }

    return topic.topic;
  }

  render() {
    return (
      <div className="DraggableTopics">
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {this.props.topics.map((topic, index) => (
                  <Draggable isDragDisabled={this.props.state === 'ranked'} key={topic.uid} draggableId={topic.uid} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style, this.props.state, topic)}
                      >
                        {this.getTopicTitle(topic, this.props.state)}
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
  }
}

export default DraggableTopics;
