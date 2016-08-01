(function () {
  function _lifeGroups($q, config, $http, localStorageService, $state) {
    var leader;

    function getOne(id) {
      var deferred = $q.defer();

      $http.get(config.server + '/life_groups/' + id)
        .success(function (data) {
          if (data.error || !data) {
            deferred.reject(data.error);
          }

          deferred.resolve(data);
        })
        .error(function () {
          deferred.reject('error');
        });

      return deferred.promise;
    }

    function getAll() {
      var deferred = $q.defer();

      $http.get(config.server + '/life_groups')
        .success(function (data) {
          if (data.error || !data) {
            deferred.reject(data.error);
          }
          deferred.resolve(data);
        })
        .error(function () {
          deferred.reject('error');
        });

        return deferred.promise;
    }

    function feedback(post) {
      var deferred = $q.defer();

      $http.post(config.server + '/feedbacks', post)
        .success(function (data) {
          if (data.error || !data.feedback) {
            deferred.reject(data.error);
          }
          deferred.resolve(data.feedback);
        })
        .error(function () {
          deferred.reject('error');
        });

        return deferred.promise;
    }

    function loginLeader(post) {
      var deferred = $q.defer();

      $http.post(config.server + '/leaders/login', post)
        .success(function (data) {
          if (data.error || !data.leader) {
            deferred.reject(data.error);
          }
          localStorageService.set('leader', data.leader);
          leader = data.leader;

          deferred.resolve(data.leader);
        })
        .error(function () {
          deferred.reject('error');
        });

        return deferred.promise;
    }

    function logoutLeader() {
      localStorageService.remove('leader');
      leader = null;
      $state.go('tab.lifegroups-login');
    }

    function currentLeader() {
      if (!leader) {
        leader = localStorageService.get('leader');
      }
      return leader;
    }

    return {
      one: getOne,
      all: getAll,
      feedback: feedback,
      login: loginLeader,
      logout: logoutLeader,
      current: currentLeader
    };
  }

  _lifeGroups.$inject = [
    '$q', 'Config', '$http', 'localStorageService',
    '$state', '$cordovaPush', '$ionicPlatform'
  ];

  angular.module('starter.services')
    .factory('LifeGroups', _lifeGroups);

})();