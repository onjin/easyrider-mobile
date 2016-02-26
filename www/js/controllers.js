angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, States, erDialogs) {
  $scope.enabledTracking = false;
  $scope.watchID = null;
  $scope.lastPosition = null;

  $scope.enableTracking = function () {

    $scope.enabledTracking = true;

    function onSuccess(position) {
      // store last position for debugging
      $scope.lastPosition = position;

      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      // send position to REST API with application uuid
      // TODO: cache bunch of position in local sql db and send them
      // from time to time when network is available

      /*
      var url = 'http://192.168.1.185:5000/point';
      data = [
        {
          uuid4: 'uuid',
          point: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          time: new Date().getTime()
        }
      ];
      */

      /*
      $http.post(url).then(function(response) {
        console.log('location sent to server ' + url);
      }, function(response) {
        console.log('problem sending location to server' + url);
        console.log(response);
      });
      */
     return true;

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      console.log('problem getting position' + error.code + ' - ' + error.message);
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    $scope.watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
      frequency: 5000,
      timeout: 3000,
      enableHighAccuracy: true
    });
    console.log('Śledzenie włączone');
  };

  $scope.disableTracking = function () {
    $scope.enabledTracking = false;
    if ($scope.watchID != null) {
      navigator.geolocation.clearWatch($scope.watchID);
      $scope.watchID = null;
    }
    console.log('Śledzenie anulowane');
  };

})

.controller('ReportCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('TrackDetailCtrl', function($scope, $stateParams, Tracks) {
  $scope.track = Tracks.get($stateParams.trackId);
})

.controller('SummaryCtrl', function($scope) {
  $scope.tracks = [
    {id: 'someid1', name: 'dojazd do pracy', 'summary': '10:45 - 15 minut'},
    {id: 'someid2', name: 'wycieczka na skałki', 'summary': '18:45 - 1 godzina 15 minut'},
  ];
});
