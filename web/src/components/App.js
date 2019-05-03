import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';

import LandingPageContainer from './LandingPage/LandingPageContainer';
import PickTeamsContainer from './PickTeams/PickTeamsContainer';
import AddTopicsContainer from './AddTopics/AddTopicsContainer';
import HomescreenContainer from './Homescreen/HomescreenContainer';
import RankTopicsContainer from './RankTopics/RankTopicsContainer';

import { getGameData } from '../actions';

import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp({
      apiKey: 'AIzaSyCRM0-Xupt1ZvlTTt-FPYY6bieCnxTgMhI',
      authDomain: 'top-four-cca25.firebaseapp.com',
      databaseURL: 'https://top-four-cca25.firebaseio.com',
      projectId: 'top-four-cca25',
      storageBucket: '',
      messagingSenderId: '120019969623'
    });
  }

  componentDidMount() {
    if (this.props.gameUid) {
      this.props.getGameData(this.props.gameUid);
    }
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={LandingPageContainer} />
        <Route path="/:gameId/pickTeams" component={PickTeamsContainer} />
        <Route path="/:gameId/addTopics" component={AddTopicsContainer} />
        <Route path="/:gameId/homescreen" component={HomescreenContainer} />
        <Route path="/:gameId/rankTopics" component={RankTopicsContainer} />
      </div>
    );
  }
}

const mapStateToProps = ({ Game }) => ({
  gameUid: Game.gameUid
});

export default connect(mapStateToProps, { getGameData })(App);
