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

  getClass(isDragging, topic) {
    const ranked = this.topicIsRanked(topic);

    let className = 'DraggableTopic';

    if (isDragging) {
      className += ' DraggableTopic--dragging';
    } else if (ranked) {
      if (this.props.active) {
        className += ' DraggableTopic--ranked';
      } else if (topic.isCorrect) {
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
        <span className="DraggableTopic__title">
          {topic.correctTopic.topic}{' '}
          <em>
            <strike>{topic.topic}</strike>
          </em>
        </span>
      );
    }

    if (ranked && this.props.active) {
      return (
        <span className="DraggableTopic__title DraggableTopic__title--sized">
          {topic.topic}
        </span>
      );
    }

    return (
      <span className="DraggableTopic__title">{topic.topic}</span>
    );
  }

  renderRevealButton(topic) {
    const { active, lockedIn, reveal } = this.props;

    if (!lockedIn) {
      return (
        <div className="DraggableTopic__right-content">
          <Icon>drag_handle</Icon>
        </div>
      );
    }

    if (active && lockedIn) {
      if (topic.status !== 'ranked') {
        return (
          <div className="DraggableTopic__right-content">
            <Button
              variant={topic.status === 'ranked' ? 'contained' : 'outlined'}
              onClick={() => reveal(topic)}
              disabled={topic.status === 'ranked'}
            >
              Reveal
            </Button>
          </div>
        );
      }

      let className = 'DraggableTopic__right-content--circle';

      if (topic.percentCorrect > 0.75) {
        className += ' DraggableTopic__right-content--guessed-correct';
      } else if (topic.percentCorrect > 0.25 && topic.percentCorrect <= 0.75) {
        className += ' DraggableTopic__right-content--guessed-middle';
      } else {
        className += ' DraggableTopic__right-content--guessed-incorrect';
      }

      return (
        <div className="DraggableTopic__right-content DraggableTopic__right-content--sized">
          <div className={className}>
            {`${topic.percentCorrect * 100}%`}
          </div>
        </div>
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
