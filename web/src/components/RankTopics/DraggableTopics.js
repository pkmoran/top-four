import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './styles/DraggableTopics.css';

class DraggableTopics extends Component {
  topicIsRanked(topic) {
    return (
      this.props.state === 'ranked' &&
      (topic.correctTopic || {}).status === 'ranked'
    );
  }

  getItemStyle(isDragging, draggableStyle, topic, last) {
    const ranked = this.topicIsRanked(topic);

    let background;

    if (isDragging) {
      background = 'lightgreen';
    } else if (ranked) {
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
      margin: last ? '0' : '0 0 8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background,
      height: '36px',
      ...draggableStyle
    };
  }

  getTopicTitle(topic) {
    const ranked = this.topicIsRanked(topic);

    if (ranked && !topic.isCorrect) {
      return (
        <span>
          {topic.correctTopic.topic}{' '}
          <em>
            <strike>{topic.topic}</strike>
          </em>
        </span>
      );
    }

    return topic.topic;
  }

  renderRevealButton(topic) {
    const { active, lockedIn, reveal } = this.props;

    if (!lockedIn) {
      return <Icon>drag_handle</Icon>
    }

    if (active && lockedIn && topic.status !== 'ranked') {
      return (
        <Button variant="outlined" onClick={() => reveal(topic)}>
          Reveal
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="DraggableTopics">
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {this.props.topics.map((topic, index) => (
                  <Draggable
                    isDragDisabled={this.props.isDragDisabled}
                    key={topic.uid}
                    draggableId={topic.uid}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={this.getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          topic,
                          index === 3
                        )}
                      >
                        {this.getTopicTitle(topic)}
                        {this.renderRevealButton(topic)}
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
