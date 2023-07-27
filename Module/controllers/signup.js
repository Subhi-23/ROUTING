var app = angular.module('signup');

app.controller('signup', ['$scope', '$location', 'setname', '$http', function ($scope, $location, setname, $http) {
    $scope.submitform = function () {
        $scope.username = "guest";
        $http({
            url: 'http://localhost/ROUTING/class/index.php',
            method: 'POST',
            data: {
                "firstName": $scope.firstName,
                "email": $scope.email,
                "password": $scope.password,
                "confirm-password": $scope.confirm_password,
                "phoneNumber": $scope.phoneNumber,
                "hidden": "register"
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        }).then(function (response) {
            if (response.data === "Registration Succesfull back to signin page") {
                $scope.username = "guest";
                $http({
                    url: 'http://localhost/ROUTING/class/getusername.php',
                    method: 'POST',
                    data: {
                        "email": $scope.email,
                        "password": $scope.password,
                        "hidden": "signin"
                    },
                })
                    .then(function (response) {
                        $scope.username = response.data.firstname;
                        setname.setName($scope.username);
                        $location.path('/signin');
                    })
            }
            else {
                document.getElementById("response").innerHTML = response.data;
            }

        }), function (error) {
            console.error('Request failed:', error.status, error.statusText);
        }
    }
    $scope.signup = function () {
        $location.path('/signup');
    }
    $scope.signin = function () {
        $location.path('/signin');
    }
}]);