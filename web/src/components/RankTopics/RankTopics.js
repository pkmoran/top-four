import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import GameId from '../GameId';
import DraggableTopics from './DraggableTopics';
import ChoiceDialog from '../ChoiceDialog';

import './styles/RankTopics.css';

class RankTopicsComponent extends Component {

  headerText() {
    if (this.props.active) {
      return 'Let\'s Rank!';
    }

    return 'Let\'s Guess!';
  }

  descriptionText() {
    if (this.props.active) {
      return 'Put the following topics in order from best to worst';
    }

    return `How would ${this.props.activePlayerName} rank the following topics?`;
  }

  renderActionButton() {
    if (this.props.active) {
      if (this.props.state === 'ranking') {
        return (
          <Button onClick={this.props.showLockInDialog}>Lock In!</Button>
        );
      }

      return (
        <Button onClick={this.props.endRound}>End Round!</Button>
      )
    }
  }

  render() {
    return (
      <div className="RankTopics">
        <GameId gameId={this.props.gameId}/>
        <h1>{this.headerText()}</h1>

        <span>{this.descriptionText()}</span>

        <div className="RankTopicsTopics">
          <DraggableTopics state={this.props.state} topics={this.props.topics} onDragEnd={this.props.onDragEnd} />
        </div>

        {this.renderActionButton()}

        <ChoiceDialog
          open={this.props.showDialog}
          titleText="Lock in your ranking?"
          contentText="Is the group done guessing your ranks?"
          choiceOneText="Yep!"
          onChoiceOne={this.props.lockIn}
          choiceTwoText="Nope!"
          onChoiceTwo={this.props.hideLockInDialogDialog}
          onClose={this.props.hideLockInDialog}
        />
      </div>
    );
  }
}

export default RankTopicsComponent;
