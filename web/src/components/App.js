import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import PickTeams from './PickTeams';
import AddTopics from './AddTopics';
import Homescreen from './Homescreen';
import { getGames } from '../actions';

import './styles/App.css';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCRM0-Xupt1ZvlTTt-FPYY6bieCnxTgMhI',
      authDomain: 'top-four-cca25.firebaseapp.com',
      databaseURL: 'https://top-four-cca25.firebaseio.com',
      projectId: 'top-four-cca25',
      storageBucket: '',
      messagingSenderId: '120019969623'
    });

    this.props.getGames();
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={LandingPage} />
        <Route path="/:gameId/pickTeams" component={PickTeams} />
        <Route path="/:gameId/addTopics" component={AddTopics} />
        <Route path="/:gameId/homescreen" component={Homescreen} />
      </div>
    );
  }
}

export default connect(null, { getGames })(App);
