(function () {
    var app = angular.module("upsnapApp");
    app.controller("viewCtrl",advertiserCtrl);

    function advertiserCtrl(advertiserService) {

        var self = this;
        advertiserService.getAdvertisers()
            .then(function (data) {
                self.advertisers = data;
            });
    }
})();