angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Events, $state, UserService, Config, $ionicPlatform, $ionicLoading, $cordovaPush, $ionicSlideBoxDelegate) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  Events.all().then(function (events) {
    $scope.events = events;
    $ionicSlideBoxDelegate.update();
    $ionicLoading.hide();
  });

  if (UserService.current()) {
    // console.log('log registered', UserService.current());
    return;
  }
  
  $ionicPlatform.ready(function () {
    // $cordovaPush.unregister().then(function(result) {
    //   // Success!
    // console.log('log - push unregister', result);
    // }, function(err) {
    //   // Error
    // });

    $cordovaPush.register({
      badge: true,
      sound: true,
      alert: true
    }).then(function (result) {
      // console.log('log - register', result);
      UserService.registerDevice({type: "ios", token: result}).then(function () {
        // $ionicLoading.hide();
        // $state.go('tab.news');
      }, function (err) {
        // console.log(err);
      });
    }, function (err) {
      // console.log('reg device error', err);
    });
  });


  // Register
  // function register() {
  //   var config = null;

  //   if (ionic.Platform.isAndroid()) {
  //       config = {
  //           "senderID": "ob1-church" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
  //       };
  //   }
  //   else if (ionic.Platform.isIOS()) {
  //       config = {
  //           "badge": "true",
  //           "sound": "true",
  //           "alert": "true"
  //       }
  //   }

  //   $cordovaPush.register(config).then(function (result) {
  //       console.log("Register success " + result);

  //       $scope.registerDisabled=true;
  //       // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
  //       if (ionic.Platform.isIOS()) {
  //           UserService.registerDevice({type: "ios", token: result}).then(function () {
  //             // $ionicLoading.hide();
  //             // $state.go('tab.news');
  //             return;
  //           }, function (err) {
  //             console.log(err);
  //           });
  //       }
  //   }, function (err) {
  //       console.log("Register error " + err)
  //   });
  // }

})

.controller('SermonsCtrl', function($scope, Sermons, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicLoading.show({
    template: 'Loading...'
  });
  Sermons.all().then(function (series) {
    $scope.series = series;
    $ionicLoading.hide();
  });

  $scope.refresh = function () {
    Sermons.all().then(function (series) {
      $scope.series = series;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('SermonsSerieCtrl', function($scope, $stateParams, Sermons, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  
  var id = $stateParams.serieId;
  Sermons.one(id).then(function (serie) {
    $scope.serie = serie;

    $scope.sermons = serie.sermons;
    $scope.title = serie.name; 
    $scope.img = serie.face;
    $scope.serieId = serie.id;

    $ionicLoading.hide();
  }); 
})

.controller('SermonsDetailCtrl', function($scope, $stateParams, Sermons, $sce, $cordovaSocialSharing, $ionicLoading, MediaManager) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $ionicLoading.show({
    template: 'Loading...'
  });
  
  Sermons.getSermon($stateParams.serieId, $stateParams.sermonId).then(function (sermon) {
    $scope.sermon = sermon;

    $scope.embedVideo = sermon.video.replace("watch?v=", "embed/");

    $scope.audioTrack = {
      url: sermon.audio,
      artist: sermon.author,
      title: sermon.title,
      art: sermon.image
    }

    console.log('image', sermon.image);
    console.log('audio', $scope.audioTrack);

    $ionicLoading.hide();
  });

  $scope.stopPlayback = function() {
    MediaManager.stop();
  };
  // stop any track before leaving current view
  $scope.$on('$ionicView.beforeLeave', function() {
    MediaManager.stop();
  });

  $scope.showStudy = false;
  $scope.showAudioPlayer = false;
  $scope.showQuestions = function(){
    $scope.showStudy = !$scope.showStudy;
  }
  $scope.showContent = function(){
    $scope.showStudy = !$scope.showStudy;
  }
  $scope.showPlayer = function(){
    $scope.showAudioPlayer = !$scope.showAudioPlayer;
  }


  $scope.share = function(){
    $cordovaSocialSharing
      .share('Hey, take a look at this sermon', '', 'img/share.jpg', $scope.sermon.link) // Share via native share sheet
      .then(function(result) {
        console.log('log - sharing success', result);
        // Success!
      }, function(err) {
        console.log('log - sharing error', err);
        // An error occured. Show a message to the user
      });
  }  
})

.controller('EventsCtrl', function ($scope, Events, $ionicLoading, $ionicSlideBoxDelegate) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  Events.all().then(function (events) {
    $scope.events = events;
    $ionicSlideBoxDelegate.update();
    $ionicLoading.hide();
  });

  $scope.refresh = function () {
    Events.all().then(function (events) {
      $scope.events = events;
      $scope.$broadcast('scroll.refreshComplete');
      $ionicSlideBoxDelegate.update();
    });
  };
})

.controller('EventsDetailCtrl', function($scope, $stateParams, Events, $cordovaSocialSharing, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  
  var id = $stateParams.eventId;
  Events.one(id).then(function (event) {
    $scope.event = event;
    $ionicLoading.hide();
  }); 

  $scope.share = function(){
    $cordovaSocialSharing
      .share($scope.event.share_text, '', $scope.event.image, $scope.event.link) // Share via native share sheet
      .then(function(result) {
        console.log('log - sharing success', result);
        // Success!
      }, function(err) {
        console.log('log - sharing error', err);
        // An error occured. Show a message to the user
      });
  }
})

.controller('GiveCtrl', function($scope, $state, $ionicLoading, PaypalService) {
  $scope.data = {};

  $scope.submit = function(data) {
    console.log('log - amount', data.amount);
    PaypalService.initPaymentUI().then(function () {
      PaypalService.makePayment(data.amount, "Give").then(function(_return){
        console.log('log - data', _return);
      });
    });
  };
})

.controller('LifegroupsCtrl', function($scope, LifeGroups, $cordovaGeolocation, $state, Sermons, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  LifeGroups.all().then(function (groups) {
    $scope.groups = groups;
    $ionicLoading.hide();
  });

  var posOptions = {timeout: 3000, enableHighAccuracy: false};
  var currenLocation = {};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      currenLocation.latitude = position.coords.latitude;
      currenLocation.longitude = position.coords.longitude;
      // console.log('log - location', currenLocation);
    }, function(err) {
      // error
      // console.log('log - error to get location');
    });

  function toRad(value) {
    var RADIANT_CONSTANT = 0.0174532925199433;
    return (value * RADIANT_CONSTANT);
  }

  $scope.currenLocation = function(){
    return currenLocation;
  }

  $scope.calculateDistance = function(starting, ending) {
    var KM_RATIO = 6371;
    try {      
      var dLat = toRad(ending.latitude - starting.latitude);
      var dLon = toRad(ending.longitude - starting.longitude);
      var lat1Rad = toRad(starting.latitude);
      var lat2Rad = toRad(ending.latitude);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = KM_RATIO * c;
      var miles = d * 0.621371;
      return miles.toFixed(2);
    } catch(e) {
      return -1;
    }
  }


  $scope.questions = function(){
    Sermons.lastSerie().then(function(lastSermon){
      // console.log('log - sermonId', lastSermon);
      $state.go('tab.sermons-detail', {serieId: lastSermon.id, sermonId: lastSermon.sermons[0].id});
    });
  }

  $scope.login = function(){
    if (LifeGroups.current()) {
      $state.go('tab.lifegroups-feedback');
    } else {
      $state.go('tab.lifegroups-login');
    }
  }
})

.controller('LifeGroupDetailCtrl', function($scope, $stateParams, LifeGroups, $state, Sermons, $cordovaSocialSharing, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  
  var id = $stateParams.groupId;
  LifeGroups.one(id).then(function (group) {
    $scope.group = group;

    initialize();
    $ionicLoading.hide();
  });

  function initialize() {
    var myLatlng = new google.maps.LatLng($scope.group.location.latitude, $scope.group.location.longitude);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById("map-lifegroup"), mapOptions);
    
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: $scope.group.title
    });

    $scope.map = map;
  }
  // google.maps.event.addDomListener(window, 'load', initialize);
  

  $scope.find = function(){
    $state.go('tab.lifegroups');
  }

  $scope.questions = function(){
    Sermons.lastSerie().then(function(lastSermon){
      // console.log('log - sermonId', lastSermon);
      $state.go('tab.sermons-detail', {serieId: lastSermon.id, sermonId: lastSermon.sermons[0].id});
    });
  }

  $scope.share = function(){
    $cordovaSocialSharing
      .share('Hey, come to our life group', '', 'img/share.jpg', $scope.group.link) // Share via native share sheet
      .then(function(result) {
        // console.log('log - sharing success', result);
        // Success!
      }, function(err) {
        // console.log('log - sharing error', err);
        // An error occured. Show a message to the user
      });
  }

  $scope.login = function(){
    if (LifeGroups.current()) {
      $state.go('tab.lifegroups-feedback');
    } else {
      $state.go('tab.lifegroups-login');
    }
  }
})

.controller('LifeGroupFeedbackCtrl', function($scope, $stateParams, LifeGroups, $state, Sermons, $cordovaSocialSharing, $ionicLoading, $ionicPopup) {
  $scope.data = {};

  if (!LifeGroups.current()) {
    $state.go('tab.lifegroups-login');
  }

  $scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  };

  $scope.submit = function(data) {
    $ionicLoading.show({
      template: 'Submiting...'
    });

    LifeGroups.feedback({ feedback: data, leader: LifeGroups.current() }).then(function (feedback) {
      // console.log('log - feedback', feedback);
      if (feedback.id) {
        $ionicLoading.hide();
        $scope.data = {};

        var alertPopup = $ionicPopup.alert({
          title: 'Submited!',
          template: 'Thanks for submit your feedback!'
        });
        return;
      }
    }, function(err) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Form failed!',
        template: 'Please try again!'
      });
    });
  };
})

.controller('LoginCtrl', function($scope, $stateParams, LifeGroups, $state, $ionicLoading, $ionicPopup) {
  $scope.data = {};
  if (LifeGroups.current()) {
    $state.go('tab.lifegroups-feedback');
  }

  $scope.login = function(data) {
    $ionicLoading.show({
      template: 'Loading...'
    });

    LifeGroups.login({ email: data.email, password: data.password }).then(function (user) {
      // console.log('log - user', user);
      if (user.id) {
        $ionicLoading.hide();
        $state.go('tab.lifegroups-feedback');
        return;
      }
    }, function(err) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('AboutCtrl', function($scope, $ionicLoading, $cordovaSocialSharing) {
  function initialize() {
    var myLatlng = new google.maps.LatLng(32.745600, -117.246755);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'OB1 Church'
    });

    $scope.map = map;
  }
  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();

  $scope.share = function(){
    $cordovaSocialSharing
      .share('Hey, come visit us at 4790 Santa Monica, Ocean Beach. Learn more', '', 'img/share.jpg', 'http://ob1church.com') // Share via native share sheet
      .then(function(result) {
        // console.log('log - sharing success', result);
        // Success!
      }, function(err) {
        // console.log('log - sharing error', err);
        // An error occured. Show a message to the user
      });
  }

})

.controller('AboutTimeCtrl', function($scope, $ionicModal, $cordovaSocialSharing){
  $ionicModal.fromTemplateUrl('templates/about/parking-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    function initialize() {
      var myLatlng = new google.maps.LatLng(32.744195, -117.246638);
      
      var mapOptions = {
        center: myLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      };

      var map = new google.maps.Map(document.getElementById("parking-map"), mapOptions);
      
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'OB1 Church'
      });

      $scope.map = map;
    }
    // 
    $scope.modal.show().then(function(){
      // google.maps.event.addDomListener(window, 'load', initialize);
      initialize();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  // openIosMap is for open IOS Map application.
  $scope.openIosMap = function (targetDestinationLocation) {
    window.open('maps://?q=32.745549,-117.246724', '_system');
  };// End openIosMap

  $scope.openGoogleMap = function (targetDestinationLocation) {
    window.open('comgooglemaps://?q=32.745549,-117.246724&zoom=15', '_system');
  };// End openGoogleMap

  $scope.share = function(){
    $cordovaSocialSharing
      .share('Hey, come visit us at 4790 Santa Monica, Ocean Beach. Learn more', '', 'img/share.jpg', 'http://ob1church.com') // Share via native share sheet
      .then(function(result) {
        // console.log('log - sharing success', result);
        // Success!
      }, function(err) {
        // console.log('log - sharing error', err);
        // An error occured. Show a message to the user
      });
  }
});
