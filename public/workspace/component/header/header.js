app.controller('headerController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "headerName": "Card Validator Application"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();
});