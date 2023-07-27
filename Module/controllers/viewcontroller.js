var app = angular.module('view', []);
app.controller('view', ['$scope', '$http', 'setname', 'sendData', 'setdate', '$location', '$filter', function ($scope, $http, setname, sendData, setdate, $location, $filter) {
  $scope.show = false;
  $scope.hide = true;

  $scope.viewfunction = function () {
    $scope.date = setdate.getdate();
    $scope.userid = setname.getId();
     
    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {
        'Id': $scope.userid,   
        'date' : $scope.date,      
        'hidden': 'viewbygroup'
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
      console.log((response.data));
    })
  }
  $scope.clicked = false;
  $scope.cancel = function (id, time, index) {
     console.log(id)
    $scope.userid = setname.getId();
    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {

        'Id': $scope.userid,
        'Pid': id,
        'date': time,
        'hidden': 'cancel'

      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
      console.log(response.data == "cancelled");

    })
    console.log(index);
    var value = $scope.GetArray[index];
    value['disabled'] = true;
    value['status'] = "cancelled";
    $scope.GetArray[index] = value;
    console.log($scope.GetArray[index]);
  }
  $scope.formatTime = function (dateString) {
    var dateTimeString = dateString;
    var dateTime = new Date(dateTimeString);

    return $filter('date')(dateTime, 'dd MMMM yyyy ');
  };
  $scope.order = function () {
    $location.path("/order")
  }
  $scope.closepopup =function(){
    $scope.popup =false;
    $scope.viewfunction();
  }
  $scope.vieworder = function(Id,date){
    console.log (Id);
    $scope.popup =true;
    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {
        'Id': $scope.userid,
        'date' : date,
        'Oid': Id,
        'hidden': 'vieworders'
   
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
      console.log((response.data));
    })

  }
}])
