import React from 'react';
import { connect } from 'react-redux';

import './styles/GameId.css';

const GameId = props => (
  <div className="GameId">
    <span>Top Four</span>
    <span>{props.gameId}</span>
  </div>
);

const mapStateToProps = ({ Game }) => ({
  gameId: Game.gameId
});

export default connect(mapStateToProps, {})(GameId);
