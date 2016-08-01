(function () {
  function _EventsService($q, config, $http) {

    function getOne(id) {
      var deferred = $q.defer();

      $http.get(config.server + '/events/' + id)
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

      $http.get(config.server + '/events')
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

    return {
      one: getOne,
      all: getAll
    };
  }

  _EventsService.$inject = ['$q', 'Config', '$http'];

  angular.module('starter.services')
    .factory('Events', _EventsService);
})();
