<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
    include 'headers.php';
   
   include 'connection.php';
   $value = json_decode(file_get_contents('php://input'), true); 
 
   $user= $value['userid'];
   //Query to take from items table and specific table
    $query="SELECT *
        FROM items
        LEFT JOIN Specifictable ON items.Productid = Specifictable.Pid
        WHERE (items.User = 'All' OR Specifictable.Userid = '$user');
        ";
    
    $result = mysqli_query($conn ,$query);  
       
    while( $row = mysqli_fetch_array($result)){
        $Items[] = $row;    
        
    }
  
   echo json_encode($Items);
 $Oid = 0;
$dup = "SELECT `UserId` FROM `TotalOrders` WHERE `UserId` = '$user'";
$duplicate_result = mysqli_query($conn, $dup);
 if ($duplicate_result->num_rows > 0) { //if rows found->user already exists
    
  } 
 else{
    $insupdate = "INSERT INTO `TotalOrders` (`UserId`, `OrderId`) VALUES ('$user','$Oid')";
   // echo $insupdate;
    $run = mysqli_query($conn ,$insupdate);
 }
 
?>