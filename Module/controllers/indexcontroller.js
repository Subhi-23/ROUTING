var app = angular.module('my-App');

app.controller('indexcontroller', ['$scope', '$location', 'myservice', 'setname', 'sendData', '$http', '$window', function ($scope, $location, myservice, setname, sendData, $http, $window) {
  // $scope.CartLength=localStorage.getItem('selectedLength');
  $scope.CartLength = myservice.getlength();
  //$scope.ItemsInCart=localStorage.getItem('ItemsInCart');
  $scope.username = setname.getName();
  $scope.RemainingItemsInCart = myservice.getArray();
  $scope.items = [];
  $scope.initialized = true;
  $scope.userid = setname.getId();
  $scope.httprequest = function () {

    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/database/db.php',
      data: {
        'userid': $scope.userid
      }
    }).then(function (response) {
      $scope.items = response.data;
      console.log("entered");
      //$scope.items= angular.fromJson(response.data);
      //return response.data;
      angular.forEach($scope.RemainingItemsInCart, function (item, index) {
        $scope.itemsincartid = item.id;
        angular.forEach($scope.items, function (item, value) {
          console.log(index);
          if ($scope.itemsincartid == item.Productid) {

            var value = $scope.items[index];
            value['disabled'] = true;
            $scope.items[index] = value;
          }
        })
      })
    })
  }

  $scope.orderhistory = function () {
    //   $scope.uid = setname.getId(); 

    //   $http({
    //     method: "POST",
    //     url: 'http://localhost/ROUTING/class/buynow.php',
    //     data:{         
    //       'Id': $scope.uid ,        
    //       'hidden' : 'orderhistory'
    //     },
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }


    // }).then(function(response){      
    //   sendData.setarray(response.data);
    //     console.log(response.data);
    // })
    $location.path('/order');
  }

  $scope.sortfunction;
  $scope.sortby = function (value) { //Sorting the items 
    $scope.sortfunction = value.operation;
  }
  //Disabling the items in main page which are in summary page  
  $scope.options = [ //Available sortby Options
    {
      operation: 'price',
      option: 'Low to High',
    },
    {
      operation: '-price',
      option: 'High to Low',
    },
    {
      operation: 'name',
      option: 'A-Z',
    },
    {
      operation: '-name',
      option: 'Z-A',
    },
  ];
  $scope.clear = function () {
    localStorage.clear()
    $window.location.href = 'signin.html'
  }
  $scope.selecteditems = [];
  $scope.price = [];

  $scope.additems = function (id, item, imageUrl, price, quantity, index) { //Adding Selected items to array      
    $scope.selecteditems.push({
      id: id,
      items: item,
      price: price,
      image: imageUrl,
      quantity: quantity,
      disabled: true
    }
    );
    // console.log($scope.selecteditems);
    //console.log(id);
    //console.log($scope.selecteditems);             
    // console.log($scope.items[id-1].Productid);
    //var indexs = $scope.items.indexOf();

    console.log(index);
    var value = $scope.items[index];
    value['disabled'] = true;

    $scope.items[index] = value;
    $scope.CartLength++;
    $scope.uid = setname.getId();
    console.log(id);

    $http({
      method: "POST",
      url: 'http://localhost/ROUTING/class/buynow.php',
      data: {
        'itemid': $scope.items[index].Productid,
        'itemname': $scope.items[index].name,
        'price': $scope.items[index].price,
        'Id': $scope.uid,
        'quantity': $scope.items[index].quantity,
        'hidden': 'insertproduct'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
      console.log(response.data);
    })
  };
  angular.forEach($scope.RemainingItemsInCart, function (item, index) {
    $scope.selecteditems.push(item);

    //console.log($scope.items[index]);
  }); //Pushing the Remaining items in cart to selected items
  $scope.clear = function () {
    $location.path('/signin');
  }
  $scope.cart = function () { //Passing the Array of addItems and Price of items
    //localStorage.setItem('Items', JSON.stringify($scope.selecteditems));
    myservice.setArray($scope.selecteditems);
    $location.path('/cart'); //Redirect to next Page
  }



  $scope.sortByPriceRange = function (range) {
    $scope.priceRange = range;
  };


}]);

//services 

app.service('myservice', function () {
  var myarray = [];
  var length = 0;

  var setArray = function (newarray) {
    myarray = newarray;
    // console.log("TYpee of array",typeof myarray);
  }
  var setlength = function (lengthofitem) {
    length = lengthofitem;
  }
  var getlength = function () {

    return length;
  }
  var getArray = function () {

    return myarray;
  }
  return {
    setArray: setArray,
    getArray: getArray,
    setlength: setlength,
    getlength: getlength,

  }
})

//Filter
app.filter('Filter', function () {

  return function (items, Range) {
    if (!Range) {
      return items;
    }
    var range = Range.split('-');
    var minPrice = parseInt(range[0]);
    var maxPrice = parseInt(range[1]);
    var filtered = []
    angular.forEach(items, function (item) {
      if (item.price >= minPrice && item.price <= maxPrice) {
        filtered.push(item);
      }
    })
    return (filtered);
  }
});
