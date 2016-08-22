// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('starter.services', []);
// angular.module('starter.controllers', []);

angular.module('starter', [
  'ionic', 
  'ionic-audio',
  'starter.controllers', 
  'starter.services',
  'ngCordova', 
  'LocalStorageModule'
])

.run(function($ionicPlatform, $rootScope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Notification Received
  $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
      // console.log(JSON.stringify([notification]));
      if (ionic.Platform.isAndroid()) {
          handleAndroid(notification);
      }
      else if (ionic.Platform.isIOS()) {
          handleIOS(notification);
          $rootScope.$apply(function () {
              $rootScope.notifications.push(JSON.stringify(notification.alert));
          })
      }
  });

  // Android Notification Received Handler
  function handleAndroid(notification) {
      // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
      //             via the console fields as shown.
      // console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
      if (notification.event == "registered") {
          $rootScope.regId = notification.regid;
          storeDeviceToken("android");
      }
      else if (notification.event == "message") {
          $cordovaDialogs.alert(notification.message, "Push Notification Received");
          $rootScope.$apply(function () {
              $rootScope.notifications.push(JSON.stringify(notification.message));
          })
      }
      else if (notification.event == "error")
          $cordovaDialogs.alert(notification.msg, "Push notification error event");
      else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
  }

  // IOS Notification Received Handler
  function handleIOS(notification) {
      // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
      // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
      // the notification when this code runs (weird).
      if (notification.foreground == "1") {
          // Play custom audio if a sound specified.
          if (notification.sound) {
              var mediaSrc = $cordovaMedia.newMedia(notification.sound);
              mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
          }

          if (notification.body && notification.messageFrom) {
              console.log('notification received with sucess - DO NOTHING');
              // $cordovaDialogs.alert(notification.body, notification.messageFrom);
          }
          else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

          if (notification.badge) {
              $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                  // console.log("Set badge success " + result)
              }, function (err) {
                  // console.log("Set badge error " + err)
              });
          }
      }
      // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
      // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
      // the data in this situation.
      else {
          if (notification.body && notification.messageFrom) {
              $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
          }
          else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
      }
  }

  // $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
  //   if (notification.alert) {
  //     navigator.notification.alert(notification.alert);
  //   }
  // });

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    // if (!UserService.current() && toState.name !== 'login') {
    //   $state.go('login');
    // }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.sermons', {
      url: '/sermons',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/tab-sermons.html',
          controller: 'SermonsCtrl'
        }
      }
    })
    .state('tab.sermons-serie', {
      url: '/sermons/:serieId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-serie.html',
          controller: 'SermonsSerieCtrl'
        }
      }
    })
    .state('tab.sermons-detail', {
      url: '/sermons/:serieId/:sermonId',
      views: {
        'tab-sermons': {
          templateUrl: 'templates/sermons-detail.html',
          controller: 'SermonsDetailCtrl'
        }
      }
    })

  .state('tab.events', {
    url: '/events',
    views: {
      'tab-events': {
        templateUrl: 'templates/tab-events.html',
        controller: 'EventsCtrl'
      }
    }
  })
    .state('tab.events-detail', {
      url: '/events/:eventId',
      views: {
        'tab-events': {
          templateUrl: 'templates/events-detail.html',
          controller: 'EventsDetailCtrl'
        }
      }
    })

  .state('tab.give', {
    url: '/give',
    views: {
      'tab-give': {
        templateUrl: 'templates/tab-give.html',
        controller: 'GiveCtrl'
      }
    }
  })

  .state('tab.lifegroups', {
    url: '/lifegroups',
    views: {
      'tab-lifegroups': {
        templateUrl: 'templates/tab-lifegroups.html',
        controller: 'LifegroupsCtrl'
      }
    }
  })
    .state('tab.lifegroups-login', {
      url: '/lifegroups/login',
      views: {
        'tab-lifegroups': {
          templateUrl: 'templates/lifegroups/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('tab.lifegroups-feedback', {
      url: '/lifegroups/feedback',
      views: {
        'tab-lifegroups': {
          templateUrl: 'templates/lifegroups/feedback.html',
          controller: 'LifeGroupFeedbackCtrl'
        }
      }
    })
    .state('tab.lifegroups-detail', {
      url: '/lifegroups/:groupId',
      views: {
        'tab-lifegroups': {
          templateUrl: 'templates/lifegroups/details.html',
          controller: 'LifeGroupDetailCtrl'
        }
      }
    })
    

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/about/index.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('tab.about-history', {
    url: '/about/history',
    views: {
      'tab-about': {
        templateUrl: 'templates/about/history.html'
      }
    }
  })

  .state('tab.about-times', {
    url: '/about/times',
    views: {
      'tab-about': {
        templateUrl: 'templates/about/times.html',
        controller: 'AboutTimeCtrl'
      }
    }
  })

  .state('tab.about-location', {
    url: '/about/location',
    views: {
      'tab-about': {
        templateUrl: 'templates/about/location.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})

.filter('hrefToJS', function ($sce, $sanitize) {
  return function (text) {
    var regex = /href="([\S]+)"/g;
    var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_system')\"");
    return $sce.trustAsHtml(newString);
  }
});
