var app = angular.module('signin', []);

app.controller('sigin', ['$scope', '$location', 'setname', '$http', function ($scope, $location, setname, $http) {
  $scope.submitform = function () {
    $http({
      url: 'http://localhost/ROUTING/class/index.php',
      method: 'POST',
      data: {
        "email": $scope.email,
        "password": $scope.password,
        "hidden": "signin"
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

    }).then(function (response) {

      if (response.data === " ") {
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
            setname.setid(response.data.sno);
            $location.path('/index');
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

app.service('setname', function () {
  var UserName = '';
  var UserId = '';
  var setName = function (name) {
    // console.log(name);
    UserName = name;
  }
  var setid = function (id) {
    UserId = id;
  }
  var getId = function () {
    return UserId;
  }
  var getName = function () {
    return UserName;
  }

  return {
    setName: setName,
    getName: getName,
    setid: setid,
    getId: getId
  }
})