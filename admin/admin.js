var app = angular.module('admin',[]);
app.controller('admin',['$scope','$http',function($scope,$http){
    $scope.insertdata=function(){
    //   console.log(sname.value);
    //   console.log( $scope.userSelect);
        var fileInput = document.getElementById('image');
        var file = fileInput.files[0]; 
    
        $http({
            url : 'http://localhost/ROUTING/admin/insert.php',
            method :'POST',
            data: {
                "name": $scope.name,
                "price":$scope.price,
                "quantity": $scope.quantity,
               "image": file.name,
               "unique": $scope.userSelect,
               "username" :sname.value
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
        }).then(function(response){
                if(response.data =="Data inserted!!"){                     
                    document.getElementById("response").innerHTML = response.data;
                }
                else{
                    document.getElementById("response").innerHTML = response.data;
                }
            
            console.log( response.data);
        }),function(error){
            console.error('Request failed:', error.status, error.statusText);      

        }

    }
    $scope.add=function(){
        window.location.reload();
    }
    $scope.selected = false;
    $scope.show = function(){
        console.log("entered");
        $scope.selected = true;
    }
    $scope.options=[ //Available sortby Options
    {
      key: '01',
      option: 'All',
    },
    {
      key: '02',
      option: 'Specific',
    }
   
  ];
  $scope.userSelect ;
  $scope.select = function(user){
    $scope.userSelect =  user.option ;  
    if(user.option == 'Specific'){    
        $scope.selected = true;    
        
    }
    else{
        $scope.selected = false;
    }
  }
   
}])