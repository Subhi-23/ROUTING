var app = angular.module('order', []);
app.controller('order', ['$scope', '$http', 'setname', 'sendData', '$location', 'setdate', '$filter', function ($scope, $http, setname, sendData, $location, setdate, $filter) {
  $scope.index = function () {
    $location.path("/index");
  }

  $scope.order = function () {
    $scope.userid = setname.getId();
    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {
        'Id': $scope.userid,
        'hidden': 'orderhistory'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {

      sendData.setarray(response.data);
      $scope.GetArray = [];
      $scope.OrderedItems = sendData.getarray();
      $scope.GetArray = angular.fromJson($scope.OrderedItems);
      console.log($scope.OrderedItems);



    })
  }

  $scope.viewdetails = function (date, name, price, quantity) {
    setdate.set(date);
    //console.log(date);
    $location.path("/view");
  }
  $scope.formatTime = function (dateString) {
    var dateTimeString = dateString;
    var dateTime = new Date(dateTimeString);
    return $filter('date')(dateTime, 'dd MMMM yyyy ');
  };
}])

app.service('setdate', function () {
  var data = '';
  var set = function (date) {
    data = date;
  }

  var getdate = function () {
    return data;
  }

  return {
    set: set,
    getdate: getdate,
  }
})
