(function () {
  function _UserService($q, config, $http, localStorageService, $state) {
    var user;
    function currentUser() {
      if (!user) {
        user = localStorageService.get('user');
      }
      return user;
    }

    function registerDevice(putData) {
      var deferred = $q.defer();

      $http.post(config.server + '/devices', putData)
        .success(function (data) {
          if (data.error || !data.device) {
            deferred.reject(data.error);
          }

          localStorageService.set('user', data.device);
          user = data.device;

          deferred.resolve(data.device);
        })
        .error(function () {
          deferred.reject('error');
        });

        return deferred.promise;
    }

    function unregisterDevice(device) {
      var deferred = $q.defer();

      $http.delete(config.server + '/devices/'+ device.id, {})
        .success(function (data) {
          localStorageService.set('user', null);
          
          deferred.resolve(data);
        })
        .error(function () {
          deferred.reject('error');
        });

        return deferred.promise;
    }

    return {
      current: currentUser,
      registerDevice: registerDevice,
      unregisterDevice: unregisterDevice
    };
  }

  function _ConfigService() {
    return {
      server: 'https://mobile.ob1church.com/api/v1',
      // server: 'http://localhost:3000/api/v1',
      // server: 'http://c0624262.ngrok.io/api/v1',
      twitterKey: 'your_twitter_key',
      twitterSecret: 'your_twitter_secret'
    };
  }

  _UserService.$inject = [
    '$q', 'Config', '$http', 'localStorageService',
    '$state', '$cordovaPush', '$ionicPlatform'
  ];

  angular.module('starter.services')
    .factory('UserService', _UserService)
    .service('Config', _ConfigService);
})();