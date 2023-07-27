var app = angular.module('buy', []);
app.controller('buy', ['$scope', '$http', 'setname', 'sendData', '$location', function ($scope, $http, setname, sendData, $location) {

  $scope.userid = setname.getId();
  $scope.intial = function () {
    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {
        'Id': $scope.userid,
        'hidden': 'buyproduct'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
      console.log('entered controller buy');
      sendData.setarray(response.data);
      $scope.GetArray = [];
      $scope.OrderedItems = sendData.getarray();
      $scope.GetArray = angular.fromJson($scope.OrderedItems);

    });
  }
}])