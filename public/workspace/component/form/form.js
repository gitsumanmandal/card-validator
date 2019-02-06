app.controller('formController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "cardNumber": "Card Number",
            "reset": "Reset",
            "submit": "Submit",
            "selectOption": "Select an option",
            "back": "Back",
            "confirm": "Confirm"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();
    self.cardNo = null;
    self.isValid = false;
    self.notValid = false;
    self.submit = function () {
        var data = {
            cardNo: self.cardNo.toString()
        };
        var config = {
            params: data,
            headers: { 'Accept': 'application/json' }
        };
        $http.get("https://card-validator-application.herokuapp.com/validate", config).then(function (response) {
            if (response.data.status == "valid") {
                self.isValid = true;
                self.notValid = false;
                $("#card-image")[0].src = "../../images/" + response.data.data.card + ".jpg";
            }
            else {
                self.isValid = false;
                self.notValid = true;
            }
        });
    };
});
