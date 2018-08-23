import React, { Component } from 'react';
import { connect } from 'react-redux';

import requireGame from './requireGame';
import GameId from './GameId';

class RankTopicsComponent extends Component {
  render() {
    return (
      <div className="RankTopics">
        <GameId />
        <h1>Let&apos;s Rank!</h1>
      </div>
    )
  }
}

export default connect()(requireGame(RankTopicsComponent));
