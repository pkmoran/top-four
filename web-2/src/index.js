import firebase from 'firebase/app';
import 'firebase/database';

import { GameStateProvider } from 'state/game_state';

import App from 'components/app';

import 'style';

firebase.initializeApp({
  apiKey: process.env.TOP_FOUR_FIREBASE_API_KEY,
  authDomain: 'top-four-cca25.firebaseapp.com',
  databaseURL: 'https://top-four-cca25.firebaseio.com',
  projectId: 'top-four-cca25',
  storageBucket: 'top-four-cca25.appspot.com',
  messagingSenderId: '120019969623',
  appId: '1:120019969623:web:6d6ba9a3d0834b0259e512'
});

const Root = () => (
  <GameStateProvider>
    <App />
  </GameStateProvider>
);

export default Root;
