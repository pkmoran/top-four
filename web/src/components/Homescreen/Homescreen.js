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
        <Button variant="contained">Game Over!</Button>
      );
    }

    return (
      <Button variant="contained" onClick={this.props.showStartRoundDialog}>I&apos;m Up!</Button>
    );
  }

  renderRemainingRounds() {
    const { gameOver, remainingRounds } = this.props;

    if (!gameOver) {
      return `${remainingRounds} round${remainingRounds > 1 ? 's' : ''} remaining!`
    }
  }

  render() {
    return (
      <div className="Homescreen">
        <GameId gameId={this.props.gameId} />

        <h1>Scoreboard</h1>

        <div className="HomescreenTeams">
          {this.renderTeams()}
        </div>

        {this.renderRemainingRounds()}

        <div className="HomescreenActionButton">
          Who&apos;s up?
          {this.renderActionButton()}
        </div>

        <ChoiceDialog
          open={this.props.showDialog}
          titleText="Start a new round?"
          contentText={this.dialogContentText()}
          choiceOneText="Nope!"
          onChoiceOne={this.props.hideStartRoundDialog}
          choiceTwoText="Start round!"
          onChoiceTwo={this.props.startRound}
          onClose={this.props.hideStartRoundDialog}
        />
      </div>
    );
  }
}

export default HomescreenComponent;
