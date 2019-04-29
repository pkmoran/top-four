import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import GameId from '../GameId';
import TeamSummary from './TeamSummary';
import ChoiceDialog from '../ChoiceDialog';

import './styles/Homescreen.css';

class HomescreenComponent extends Component {
  componentDidMount() {
    if (this.props.ranking) {
      this.props.startRanking();
    }
  }

  componentDidUpdate() {
    if (this.props.ranking) {
      this.props.startRanking();
    }
  }

  renderTeams() {
    return this.props.teams.map(({
      uid, name, score, players
    }) => (
      <TeamSummary key={uid} name={name} score={score} players={players} />
    ));
  }

  dialogContentText() {
    return `${this.props.playerName}, you're up! Is the group ready?`;
  }

  renderActionButton() {
    if (this.props.gameOver) {
      return (
        <Button>Game Over!</Button>
      );
    }

    return (
      <Button onClick={this.props.showStartRoundDialog}>I&apos;m Up!</Button>
    );
  }

  render() {
    return (
      <div className="Homescreen">
        <GameId gameId={this.props.gameId}/>

        <h1>Who&apos;s Up?</h1>

        {this.renderActionButton()}

        {this.renderTeams()}

        <ChoiceDialog
          open={this.props.showDialog}
          titleText="Start a new round?"
          contentText={this.dialogContentText()}
          choiceOneText="Yep!"
          onChoiceOne={this.props.startRound}
          choiceTwoText="Nope!"
          onChoiceTwo={this.props.hideStartRoundDialog}
          onClose={this.props.hideStartRoundDialog}
        />
      </div>
    );
  }
}

export default HomescreenComponent;
