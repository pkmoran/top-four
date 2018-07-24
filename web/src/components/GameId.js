import React from 'react';
import { connect } from 'react-redux';

const GameId = props => <div>Game ID: {props.gameId}</div>;

const mapStateToProps = ({ Game }) => ({
  gameId: Game.gameId
});

export default connect(mapStateToProps, {})(GameId);
