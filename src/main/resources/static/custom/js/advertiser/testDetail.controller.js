(function () {
    var app = angular.module("upsnapApp");
    app.factory("advertiserCtrl",advertiserCtrl);

    function advertiserCtrl(advertiserService) {

        var self = this;
       advertiserService.getAdvertisers()
           .then(function (data) {
               return data;
           });
    }

    app.controller('bootstrapCtrl', function($scope, DTOptionsBuilder, DTColumnBuilder,advertiserCtrl){
        $scope.dtOptions = DTOptionsBuilder
            .fromSource(advertiserCtrl)
            // Add Bootstrap compatibility
            .withBootstrap();
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID').withClass('text-danger'),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
            DTColumnBuilder.newColumn('date').withTitle('Date').withOption('sType', 'date-euro')
        ];

    });
})();


