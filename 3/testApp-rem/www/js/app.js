// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.backgroundColorByHexString('#ff7878');
    }
  });
})

// change header color at main
.run(function($state, $rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
    console.log('stateChangeSuccess');
    if (toState.headerChangeColor) {
      $rootScope.headerChangeColor = true;
      StatusBar.backgroundColorByHexString('#ff7878');
    } else {
      $rootScope.headerChangeColor = false;
      StatusBar.backgroundColorByHexString('#d0021b');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    },
    headerChangeColor: true
  })
  .state('app.plugins', {
    url: '/plugins',
    views: {
      'menuContent': {
        templateUrl: 'templates/plugins.html',
        controller: 'PluginsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/plugins/:pluginId',
    views: {
      'menuContent': {
        templateUrl: 'templates/plugin.html',
        controller: 'PluginCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
