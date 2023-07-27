<?php
include '../database/headers.php';

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
 
class insertData{
  
   public function __construct(){
      $value = json_decode(file_get_contents('php://input'), true); 
      include '../database/connection.php';
      $this->data($value,$conn);
   }
   
  public function data($value,$conn){
      $Iname = $value['name'];
      $price = $value['price'];
      $quantity = $value['quantity'];
      $Iimage = $value['image'] ;     
      $unique = $value['unique'];
      $username = $value['username'];    
      $duppquery = "SELECT * FROM items WHERE name = '$Iname'";
      $duplicate_result = mysqli_query($conn, $duppquery);
      if($duplicate_result->num_rows > 0){
        echo "Data inserted already!!";
      }
      else{
        if($unique == 'All'){ //If Item for ALL insert into items table
          $insertquery = "INSERT INTO `items`(`name`, `price`, `quantity` ,`image`,`User`) VALUES ('$Iname','$price','$quantity','$Iimage','$unique')";      
          $result=mysqli_query($conn,$insertquery);
          if($result){
            echo "Data inserted!!";
          }
        }
        if($unique == 'Specific'){ //If for Specific
           $selectQuery = "SELECT `sno` FROM `userdetails` WHERE `firstname` = '$username'"; //Geting userid
           $selectresult=mysqli_query($conn,$selectQuery);
           if($selectresult->num_rows > 0){
              $row = $selectresult->fetch_assoc();
              $id = $row['sno'];
              //insert into items
              $insertquery = "INSERT INTO `items`(`name`, `price`, `quantity` ,`image`,`User`) VALUES ('$Iname','$price','$quantity','$Iimage','$unique')";      
              $result=mysqli_query($conn,$insertquery);
              if($result){
                echo "inserted";
              }
              $selectId = "SELECT `Productid` FROM `items` WHERE `name` = '$Iname'";   //Getting product id       
              $selectIdresult=mysqli_query($conn,$selectId);
              $Id=$selectIdresult->fetch_assoc();
              $Pid = $Id['Productid'];
               $insertinto = "INSERT INTO `Specifictable` (`Userid`, `Pid`) VALUES ('$id','$Pid')"; //inserting into specific table     
                $insertintores= mysqli_query($conn,$insertinto );
              if($insertintores){
                echo "successfull;";
              }
           }
           else{
              echo "User not found!!";
           }
 
        }
      }   
  }        
}
$obj = new insertData();
?>