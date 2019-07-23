import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import GameId from '../GameId';
import TeamSummary from './TeamSummary';
import PlayerSummary from './PlayerSummary';
import ChoiceDialog from '../ChoiceDialog';

import './styles/Homescreen.css';

class HomescreenComponent extends Component {
  renderScores() {
    if (this.props.teams.length > 0) {
      return this.renderTeams();
    }

    return (
      <div className="HomescreenTeams">
        {this.props.players.map(player => (
          <PlayerSummary key={player.uid} player={player} />
        ))}
      </div>
    );
  }

  renderTeams() {
    return (
      <div className="HomescreenTeams">
        {this.props.teams.map(({ uid, name, score, players }) => (
          <TeamSummary key={uid} name={name} score={score} players={players} />
        ))}
      </div>
    );
  }

  dialogContentText() {
    return `${this.props.playerName}, you're up! Is the group ready?`;
  }

  renderRemainingRounds() {
    const { gameOver, remainingRounds } = this.props;

    if (!gameOver) {
      return `${remainingRounds} round${
        remainingRounds > 1 ? 's' : ''
      } remaining!`;
    }
  }

  renderActionSection() {
    const { gameOver, rankingTeamUid, teamUid, rankingTeamName } = this.props;

    if (gameOver) {
      return <Button variant="contained">Game Over!</Button>;
    }

    if (!rankingTeamUid || rankingTeamUid === teamUid) {
      let labelText;
      if (!rankingTeamUid) {
        labelText = `Who's up?`
      } else {
        labelText = `${rankingTeamName}, who's up?`;
      }

      return (
        <>
          {labelText}
          <Button variant="contained" onClick={this.props.showStartRoundDialog}>
            I&apos;m Up!
          </Button>
        </>
      );
    }

    return `${rankingTeamName} is up!`;
  }

  render() {
    return (
      <div className="Homescreen">
        <GameId gameId={this.props.gameId} />

        <h1>Scoreboard</h1>

        <span>{this.props.roundsPlayed} rounds played!</span>

        {this.renderScores()}

        {this.renderRemainingRounds()}

        <div className="HomescreenActionButton">
          {this.renderActionSection()}
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
