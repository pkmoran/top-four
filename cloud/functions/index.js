const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const moment = require('moment');

admin.initializeApp();

exports.putOne = functions.https.onRequest((req, res) => {
  const game = {
    gameId: gameId(),
    startDate: Date.now()
  };

  return admin.database().ref('/games').push(game).then(snapshot => {
    return res.status(200).send(snapshot);
  });
});

exports.startGame = functions.https.onCall((data, context) => {
  const db = admin.database();

  return db.ref('/games').once('value').then(snapshot => {
    let gameIds = [];
    snapshot.forEach(childSnapshot => {
      gameIds.push(childSnapshot.val().gameId);
    });

    let newGameId = gameId();

    while (gameIds.includes(newGameId)) {
      newGameId = gameId();
    }

    const game = {
      gameId: newGameId,
      startDate: moment().format()
    };

    return db.ref('/games').push(game).then(snapshot => {
      return db.ref(snapshot.ref).once('value').then(snapshot => {
        return {
          gameId: snapshot.val().gameId,
          gameUid: snapshot.key
        };
      });
    });
  });
});

exports.pruneGames = functions.https.onCall((data, context) => {
  const db = admin.database();

  return db.ref('/games').once('value').then(snapshot => {
    let oldGameIds = [];
    snapshot.forEach(childSnapshot => {
      const startDate = moment(childSnapshot.val().startDate);
      if (startDate < moment().subtract(12, 'hours')) {
        oldGameIds.push(childSnapshot.key);
      }
    });

    oldGameIds.forEach(gameId => {
      db.ref('/games/' + gameId).remove();
    });

    return null;
  });
});

const gameId = () => {
  return randomLetter() + randomNumber();
};

const randomLetter = () => {
  return randomFromPossible('ACDEFGHJKLMNPQRTUVWXY');
};

const randomNumber = () => {
  return randomFromPossible('1234567890');
};

const randomFromPossible = possible => {
  return possible.charAt(Math.floor(Math.random() * possible.length));
};
