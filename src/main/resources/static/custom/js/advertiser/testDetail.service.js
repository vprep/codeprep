(function () {
    var app = angular.module("upsnapApp");

    app.service("advertiserService", function ($http) {

        var self = this;

        var filterVO = {};
        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }

        self.getAdvertisers = function () {
           var promise1 = $http.post('/advertisers/detail',filterVO,config);
           var promise2 = promise1.then(function (response) {
               return response.data;

           });
           return promise2;

        }

    });
    
})();


