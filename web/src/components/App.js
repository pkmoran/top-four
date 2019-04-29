import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';

import LandingPageContainer from './LandingPage/LandingPageContainer';
import PickTeamsContainer from './PickTeams/PickTeamsContainer';
import AddTopicsContainer from './AddTopics/AddTopicsContainer';
import HomescreenContainer from './Homescreen/HomescreenContainer';
import RankTopicsContainer from './RankTopics/RankTopicsContainer';

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

export default App;
