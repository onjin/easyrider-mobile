angular.module('starter.services', [])

.factory('Tracks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tracks = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return tracks;
    },
    remove: function(chat) {
      tracks.splice(tracks.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].id === parseInt(chatId)) {
          return tracks[i];
        }
      }
      return null;
    }
  };
})
.factory('States', function() {
  var db = window.openDatabase("CityHero", "1.0", "CityHero", 200000);
  db.transaction(populateDB, errorCB, successCB);

  function populateDB(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS STATE (id unique, data)');
  }

  // Transaction error callback
  //
  function errorCB(tx, err) {
  }

  // Transaction success callback
  //
  function successCB() {
  }

  return {
    all: function() {
      console.log('select');
      db.transaction(
        function(tx) {
          tx.executeSql('SELECT * FROM STATE', [], function(tx, results) {
            console.log(results);
            if (!results.rowsAffected) {
              return [];
            }
            return results.rows;
          })
        }
      )
    },
  }
});
