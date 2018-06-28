import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import LandingPage from './LandingPage';
import AddTopics from './AddTopics';

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
        <Route path="/" exact component={LandingPage} />
        <Route path="/:gameId/addTopics" component={AddTopics} />
      </div>
    );
  }
}

export default App;
