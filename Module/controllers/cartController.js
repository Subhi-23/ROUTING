var app = angular.module('Mycart');
app.controller('cartController', ['$scope', '$location', 'myservice', 'setname', 'sendData', '$http', '$timeout', function ($scope, $location, myservice, setname, sendData, $http, $timeout) {

    $scope.Isdisable = true;
    $scope.GetItems = myservice.getArray();
    $scope.priceofItemsInCart = [];
    $scope.totalProductPrice = 0;
    $scope.index = 0;

    $scope.discountPriceinCart = 0;
    angular.forEach($scope.GetItems, function (item, index) {
        $scope.priceofItemsInCart.push({
            price: parseInt($scope.GetItems[index].price)
        })
    });
    //$scope.discountPriceinCart=$scope.totalProductPrice
    $scope.DiscountValues = [
        {
            "couponName": "HAPPY20RS",
            "type": "RS",
            "DiscountAmount": 20
        },
        {
            "couponName": "SUBHI10PER",
            "type": "%",
            "DiscountAmount": 10
        },
        {
            "couponName": "GLARA30RS",
            "type": "RS",
            "DiscountAmount": 30
        },
        {
            "couponName": "JESMA20PER",
            "type": "%",
            "DiscountAmount": 20
        },
        {
            "couponName": "NIVE50RS",
            "type": "%",
            "DiscountAmount": 50
        },
        {
            "couponName": "SOUND30Per",
            "type": "%",
            "DiscountAmount": 30
        }]
    $scope.popup = false;
    angular.forEach($scope.priceofItemsInCart, function (item, index) {
        console.log($scope.priceofItemsInCart);
        $scope.totalProductPrice += parseInt($scope.priceofItemsInCart[index].price);
        //$scope.index= $scope.calculateDiscount($scope.totalProductPrice)
    });

    $scope.checkOutCart = function (TextinBtn) {
        $scope.popup = true;
        if ($scope.i == 1 && $scope.DiscoutCoupon !== null) {
            $scope.i = 0;
            $scope.Btntext = $scope.Buttontext[$scope.i];
            $scope.DiscoutCoupon = " ";
        }
        if (TextinBtn == "Remove Coupon") {
            $scope.NotEligible = false
            $scope.popup = false;
            $scope.i = 0;
            $scope.Btntext = $scope.Buttontext[$scope.i];
            $scope.displayDiscount = $scope.totalProductPrice
            $scope.DiscountAmount = 0;
        }
    }
    $scope.calculateDiscount = function (discountPrice, type) {// Calculating Discount
        $scope.DiscountAmount = discountPrice + " " + type;
        $scope.i = 1;
        $scope.Btntext = $scope.Buttontext[$scope.i];
        if (type == "%") {
            $scope.discountPriceinCart = ($scope.totalProductPrice * (discountPrice / 100))
            $scope.displayDiscount = $scope.totalProductPrice - $scope.discountPriceinCart
        }
        else {
            $scope.discountPriceinCart = $scope.totalProductPrice - discountPrice
            $scope.displayDiscount = $scope.discountPriceinCart
        }

    }
    $scope.displayDiscount = $scope.totalProductPrice
    $scope.applyDiscount = function (TextinBtn) {
        console.log(TextinBtn)
        //$scope.CouponValidate = (Value) => Value.couponName === $scope.DiscoutCoupon;
        $scope.CouponPresent = $scope.DiscountValues.findIndex(Value => Value.couponName === $scope.DiscoutCoupon);
        if ($scope.CouponPresent == -1) {
            $scope.AcceptedCoupon();
        }
        if ($scope.CouponPresent !== -1) {
            console.log($scope.displayDiscount)
            if ($scope.displayDiscount <= $scope.DiscountValues[$scope.CouponPresent].DiscountAmount) {
                console.log("I AM EXECUTING....")
                $scope.NotEligible = true;
                $scope.i = 0;
                $scope.Btntext = $scope.Buttontext[$scope.i];
            }
            else {
                $scope.calculateDiscount($scope.DiscountValues[$scope.CouponPresent].DiscountAmount, $scope.DiscountValues[$scope.CouponPresent].type);
                $scope.closepopup();
            }

        }

    }
    //$scope.count=1;
    $scope.countInc = function (itemprice, index, count, btn) {
        //Incrementing the Quantity of the product         
        if ((count + 1) >= 1) {
            $scope.GetItems[index].disabled = false;
        }
        $scope.GetItems[index].price = parseInt($scope.priceofItemsInCart[index].price) * (count + 1);
        $scope.uid = setname.getId();
        console.log($scope.GetItems);
        $http({
            method: "POST",
            url: 'http://localhost/ROUTING/class/buynow.php',
            data: {
                'itemid': $scope.GetItems[index].id,
                'itemname': $scope.GetItems[index].items,
                'price': $scope.GetItems[index].price,
                'quantity': $scope.GetItems[index].quantity,
                'count': count,
                'Id': $scope.uid,
                'hidden': 'addquantity'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
        })


        $scope.btnDisable = false;

        $scope.totalProductPrice += parseInt($scope.priceofItemsInCart[index].price);
        //$scope.calculateDiscount( $scope.DiscountValues[$scope.CouponPresent].DiscountAmount,$scope.DiscountValues[$scope.CouponPresent].type);                  
        if (btn == "Remove Coupon") {
            $scope.calculateDiscount($scope.DiscountValues[$scope.CouponPresent].DiscountAmount, $scope.DiscountValues[$scope.CouponPresent].type);
        }
        else if (btn == "Apply coupon") {

            $scope.displayDiscount = $scope.displayDiscount + parseInt($scope.priceofItemsInCart[index].price)
        }
        //$scope.displayDiscount+=$scope.priceofItemsInCart[index].price;  
        //$scope.index= $scope.calculateDiscount($scope.totalProductPrice)    
    }
    $scope.Buttontext = ["Apply coupon", "Remove Coupon"]
    $scope.i = 0;
    $scope.Btntext = $scope.Buttontext[$scope.i];
    $scope.countDec = function (index, count, btn) { //Decrementing the Quantity of the Product
        if ((count - 1) == 0) {  //Setting Count value decrement by one because at first the value at the count which is initialized pass and that is not zero
            $scope.GetItems[index].disabled = true;
        }
        $scope.uid = setname.getId();
        //console.log(index);
        $scope.GetItems[index].price = $scope.GetItems[index].price - parseInt($scope.priceofItemsInCart[index].price);

        $http({
            method: "POST",
            url: 'http://localhost/ROUTING/class/buynow.php',
            data: {
                'itemid': $scope.GetItems[index].id,
                'itemname': $scope.GetItems[index].items,
                'price': $scope.GetItems[index].price,
                'quantity': $scope.GetItems[index].quantity,
                'count': count,
                'Id': $scope.uid,
                'hidden': 'decquantity'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
        })


        $scope.totalProductPrice -= parseInt($scope.priceofItemsInCart[index].price);
        //$scope.displayDiscount-=$scope.priceofItemsInCart[index].price; 
        //$scope.calculateDiscount( $scope.DiscountValues[$scope.CouponPresent].DiscountAmount,$scope.DiscountValues[$scope.CouponPresent].type);                  
        if (btn == "Remove Coupon") {
            $scope.calculateDiscount($scope.DiscountValues[$scope.CouponPresent].DiscountAmount, $scope.DiscountValues[$scope.CouponPresent].type);
        }
        else if (btn == "Apply coupon") {

            $scope.displayDiscount = $scope.displayDiscount - parseInt($scope.priceofItemsInCart[index].price)

            // $scope.displayDiscount=$scope.displayDiscount-parseInt($scope.GetItems[index].price);
            console.log("display discount", $scope.displayDiscount);
            console.log("get items price", parseInt($scope.GetItems[index].price))
        }

        if ($scope.totalProductPrice == 0) {
            $scope.GetItems = []
            $scope.displayAmount = 0;
            //console.log($scope.discountPriceinCart)
        }
        if ($scope.displayDiscount <= 0) {
            $scope.NotEligible = true;
            $scope.DiscountAmount = "";
            $scope.DiscoutCoupon = " ";
            $scope.displayDiscount = $scope.totalProductPrice
            $scope.i = 0;
            $scope.Btntext = $scope.Buttontext[$scope.i];
        }
        $scope.discountPriceinCart = 0
        //console.log($scope.totalProductPrice)
        //$scope.index=$scope.calculateDiscount($scope.totalProductPrice)
        //console.log($scope.discountPriceinCart)
    }
    $scope.remove = function (index, btn) { //Removing the product from the array
        $scope.totalProductPrice -= $scope.GetItems[index].price;
        console.log(btn)
        if (btn == "Remove Coupon") {
            $scope.calculateDiscount($scope.DiscountValues[$scope.CouponPresent].DiscountAmount, $scope.DiscountValues[$scope.CouponPresent].type);
        }
        else if (btn == "Apply coupon") {

            $scope.displayDiscount = $scope.displayDiscount - $scope.GetItems[index].price
        }
        console.log($scope.GetItems[index]);
        console.log(index);
        $scope.uid = setname.getId();
        $http({
            method: "POST",
            url: 'http://localhost/ROUTING/class/buynow.php',
            data: {
                'itemid': $scope.GetItems[index].id,
                'itemname': $scope.GetItems[index].items,
                'price': $scope.GetItems[index].price,
                'Id': $scope.uid,
                'hidden': 'deleteproduct'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
        })
        $scope.GetItems.splice(index, 1);
        $scope.priceofItemsInCart.splice(index, 1)



        // $scope.discountPriceinCart=0
        console.log(index)
        if ($scope.displayDiscount <= 0) {
            //$scope.NotEligible = true;
            $scope.DiscountAmount = 0;
            $scope.DiscoutCoupon = " ";
            $scope.displayDiscount = $scope.totalProductPrice
            $scope.i = 0;
            $scope.Btntext = $scope.Buttontext[$scope.i];
        }
        // console.log( "DISPLAY AMT   "+$scope.displayDiscount +" = PRICE"+$scope.GetItems[index].price )
        console.log($scope.GetItems)

        //$scope.displayDiscount-=$scope.GetItems[index].price;
        //$scope.index= $scope.calculateDiscount($scope.totalProductPrice)
    }
    $scope.NotEligible = false;
    $scope.noItemsInCart = true;

    $scope.hidePopup = function () {
        console.log("hide pop reuns");
        $scope.popupremove = false;
        $scope.totalProductPrice = 0;
        $scope.displayDiscount = 0;
        $scope.DiscountAmount = 0;
        // document.body.classList.remove('blur-background');
    }
    $scope.removePopUp = function (TextinBtn) {
        console.log(TextinBtn)
        $scope.popup = false;
        $scope.ErrorMsg = false;
        $scope.i = 0;
        $scope.Btntext = $scope.Buttontext[$scope.i];
        $scope.DiscoutCoupon = " ";
        $scope.NotEligible = false;
    }
    $scope.DiscountAmount = 0;
    $scope.btnDisable = false;
    $scope.ErrorMsg = false;
    $scope.CouponValidate;

    $scope.RemoveDiscount = function () {
        $scope.i = 1;
        $scope.Btntext = $scope.Buttontext[$scope.i];
        // $scope.displayDiscount=$scope.totalProductPrice
    }
    $scope.AcceptedCoupon = function () {
        $scope.ErrorMsg = true;
        $scope.popup = true;
        $scope.i = 0;
        $scope.Btntext = $scope.Buttontext[$scope.i];
    }
    $scope.closepopup = function () {
        $scope.ErrorMsg = false;
        $scope.popup = false;
        // if($scope.Btntext =="Remove Coupon" && $scope.CouponPresent !==-1){
        //     console.log("I am Removed")
        //     $scope.displayDiscount = $scope.totalProductPrice
        //     //$scope.RemoveDiscount();
        // } 
    }

    $scope.cartPage = function () {
        //localStorage.setItem('ItemsInCart',JSON.stringify($scope.GetItems))
        //localStorage.setItem('selectedLength',$scope.GetItems.length);
        myservice.setlength($scope.GetItems.length);
        myservice.setArray($scope.GetItems);
        $location.path('/index');
    }
    $scope.buy = function () {
        // $scope.userid = setname.getId();  
        $location.path('/buy');
        $scope.newarray = [];

        console.log("entersed buy");
        //     console.log($scope.GetItems);

        //    console.log('called');
        //     $http({
        //         method: "POST",
        //     url: 'http://localhost/ROUTING/class/buynow.php',
        //     data:{

        //       'Id': $scope.userid ,
        //       'hidden' : 'buyproduct'
        //     },
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //       }
        //     }).then(function(response){
        //         sendData.setarray(response.data);
        //         console.log(response.data);
        //     })
        myservice.setArray($scope.newarray);
        $scope.GetItems = myservice.getArray();



        console.log("ended buy");
    }


    $scope.deliver = function () {

        $scope.popupremove = true;
        $scope.userid = setname.getId();

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

            sendData.setarray(response.data);
            $scope.GetArray = [];
            $scope.OrderedItems = sendData.getarray();
            $scope.GetArray = angular.fromJson($scope.OrderedItems);


        });

        $scope.newarray = [];
        myservice.setArray($scope.newarray);
        $scope.GetItems = myservice.getArray();

        $timeout(function () { //for hide the popup in cart
            $scope.hidePopup();
        }, 2500);
    }
}]);

app.service('sendData', function () {
    var OrderedItems = [];

    var setarray = function (myarray) {
        OrderedItems = myarray;

    }
    var getarray = function () {

        return OrderedItems;
    }
    return {
        setarray: setarray,
        getarray: getarray
    }

})