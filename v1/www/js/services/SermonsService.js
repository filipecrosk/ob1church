(function () {
  function _SermonsService($q, config, $http) {

    function getOne(id) {
      var deferred = $q.defer();

      $http.get(config.server + '/series/' + id)
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

      $http.get(config.server + '/series')
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

    function getSermon(serieId, sermonId) {
      var deferred = $q.defer();

      $http.get(config.server + '/sermons/' + sermonId)
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

    function lastSerie(){
      return getAll().then(function (series) {
        return series[0];
      });
    }

    return {
      one: getOne,
      all: getAll,
      getSermon: getSermon,
      lastSerie: lastSerie
    };
  }

  _SermonsService.$inject = ['$q', 'Config', '$http'];

  angular.module('starter.services')
    .factory('Sermons', _SermonsService);
})();
