angular.module('mexicanService', []).factory('Mexican', ['$http', function($http) {

    return {
        // call to get all mexicans
        get : function() {
            return $http.get('/api/mexicans');
        },

        // call to POST and create a new mexican
        create : function(mexicanData) {
            return $http.post('/api/mexicans', mexicanData);
        },

        // call to DELETE a mexican
        delete : function(id) {
            return $http.delete('/api/mexicans/' + id);
        }
    };       

}]);


