angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

// main page's controller
.controller('MainCtrl', function($scope) {
  $scope.greeting = [{text: "Write down and mark your deals when you've done."}];
})

// plugin's page controller
.controller('PluginsCtrl', function($scope) {
  $scope.plugins = [
    { title: 'Google Calendar', img: 'img/note.svg', id: 1 },
    { title: 'Weather', img: 'img/weather.svg', id: 2 },
    { title: 'Morning Exercises', img: 'img/dumbbell.svg', id: 3 },
    { title: 'Google Calendar', img: 'img/note.svg', id: 4 },
    { title: 'Weather', img: 'img/weather.svg', id: 5 },
    { title: 'Morning Exercises', img: 'img/dumbbell.svg', id: 6 },
    { title: 'Google Calendar', img: 'img/note.svg', id: 7 },
    { title: 'Weather', img: 'img/weather.svg', id: 8 },
    { title: 'Morning Exercises', img: 'img/dumbbell.svg', id: 9 },
    { title: 'Google Calendar', img: 'img/note.svg', id: 10 },
    { title: 'Weather', img: 'img/weather.svg', id: 11 },
    { title: 'Morning Exercises', img: 'img/dumbbell.svg', id: 12 },
    { title: 'Google Calendar', img: 'img/note.svg', id: 13 },
    { title: 'Weather', img: 'img/weather.svg', id: 14 },
    { title: 'Morning Exercises', img: 'img/dumbbell.svg', id: 15 },
  ];
})

// each plugin's controller
.controller('PluginCtrl', function($scope) {
})

