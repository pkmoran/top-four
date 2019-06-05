import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './styles/DraggableTopics.css';

class DraggableTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasDragging: false
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  topicIsRanked(topic) {
    return (
      this.props.state === 'ranked' &&
      (topic.correctTopic || {}).status === 'ranked'
    );
  }

  getClass(isDragging, topic, last) {
    const ranked = this.topicIsRanked(topic);

    let className = 'DraggableTopic';

    if (isDragging) {
      className += ' DraggableTopic--dragging';
    } else if (ranked) {
      if (topic.isCorrect) {
        className += ' DraggableTopic--correct';
      } else {
        className += ' DraggableTopic--incorrect';
      }
    }

    return className;
  }

  getStyle(style, snapshot) {
    if (snapshot.isDropAnimating) {
      const { curve, duration } = snapshot.dropAnimation;

      // patching the existing style
      return {
        ...style,
        transition: `all ${curve} ${duration}s`
      };
    }

    if (snapshot.isDragging && !this.state.wasDragging) {
      return {
        ...style,
        transition: 'box-shadow .2s'
      };
    }

    return style;
  }

  getTopicTitle(topic) {
    const ranked = this.topicIsRanked(topic);

    if (ranked && !topic.isCorrect) {
      return (
        <>
          {topic.correctTopic.topic}{' '}
          <em>
            <strike>{topic.topic}</strike>
          </em>
        </>
      );
    }

    return topic.topic;
  }

  renderRevealButton(topic) {
    const { active, lockedIn, reveal } = this.props;

    if (!lockedIn) {
      return <Icon>drag_handle</Icon>;
    }

    if (active && lockedIn && topic.status !== 'ranked') {
      return (
        <Button variant="outlined" onClick={() => reveal(topic)}>
          Reveal
        </Button>
      );
    }
  }

  onDragEnd(result) {
    this.setState({ wasDragging: false });
    this.props.onDragEnd(result);
  }

  render() {
    return (
      <div className="DraggableTopics">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} className="DraggableTopics__topics">
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
                        style={this.getStyle(
                          provided.draggableProps.style,
                          snapshot
                        )}
                        className={this.getClass(snapshot.isDragging, topic)}
                      >
                        <span className="DraggableTopic__title">{this.getTopicTitle(topic)}</span>
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
