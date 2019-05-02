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

  lockInButton() {
    return (
      <Button variant="contained" onClick={this.props.showLockInDialog}>Lock In!</Button>
    );
  }

  revealButton() {
    return (
      <Button variant="contained" onClick={this.props.reveal}>Reveal!</Button>
    );
  }

  endRoundButton() {
    return (
      <Button variant="contained" onClick={this.props.endRound}>End Round!</Button>
    );
  }

  renderInactiveActionButton() {
    const { lockedIn, state } = this.props;

    if (!lockedIn && state === 'ranking') {
      return this.lockInButton();
    }
  }

  renderActiveActionButton() {
    const { lockedIn, state } = this.props;

    if (!lockedIn) {
      return this.lockInButton();
    } else if (state === 'ranking') {
      return this.revealButton();
    }

    return this.endRoundButton();
  }

  renderActionButton() {
    if (this.props.active) {
      return this.renderActiveActionButton();
    }

    return this.renderInactiveActionButton();
  }

  renderLockedInPlayers() {
    if (this.props.state === 'ranking') {
      const { numPlayersLockedIn, numTotalPlayers } = this.props;
      const waitingOn = numTotalPlayers - numPlayersLockedIn;

      if (waitingOn > 0) {
        const playerText = waitingOn === 1 ? 'player' : 'players';

        return `Waiting on ${waitingOn} ${playerText} to lock in.`;
      }

      return 'All players locked in!';
    }
  }

  isDragDisabled() {
    const { lockedIn, state } = this.props;
    return lockedIn || state === 'ranked';
  }

  render() {
    return (
      <div className="RankTopics">
        <GameId gameId={this.props.gameId} />
        <h1>{this.headerText()}</h1>

        <span>{this.descriptionText()}</span>

        <div className="RankTopicsTopics">
          <DraggableTopics
            state={this.props.state}
            topics={this.props.topics}
            onDragEnd={this.props.onDragEnd}
            isDragDisabled={this.isDragDisabled()}
          />
        </div>

        {this.renderLockedInPlayers()}

        <div className="RankTopicsActionButton">
          {this.renderActionButton()}
        </div>

        <ChoiceDialog
          open={this.props.showDialog}
          titleText="Lock in your ranking?"
          contentText="You won't be able to change them after you lock in!"
          choiceOneText="Nope!"
          onChoiceOne={this.props.hideLockInDialog}
          choiceTwoText="Lock in!"
          onChoiceTwo={this.props.lockIn}
          onClose={this.props.hideLockInDialog}
        />

        <ChoiceDialog
          open={this.props.showRevealDialog}
          titleText="Are you sure you want to reveal?"
          contentText="Not all players have locked in there guesses yet!"
          choiceOneText="Nope!"
          onChoiceOne={this.props.hideRevealDialog}
          choiceTwoText="Reveal!"
          onChoiceTwo={this.props.forceReveal}
          onClose={this.props.hideRevealDialog}
        />
      </div>
    );
  }
}

export default RankTopicsComponent;
