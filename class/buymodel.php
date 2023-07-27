<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class buymodel{
    public function insert($conn,$Id,$itemid,$itenname,$price,$quantity){ //Inserting into orderdetails table
        
        $query = "INSERT INTO `orderdetails`(`UserId`, `ProductId`, `ProductName`, `price`,`Quantity`) VALUES ('$Id','$itemid','$itenname','$price','$quantity')";
        $result = mysqli_query($conn,$query);
        if($result){
        echo "Data inserted!!";
        }     

    }

    public function delete($conn,$userid,$productId){ //Delete from order details table
        $query = "DELETE FROM `orderdetails` WHERE `UserId`='$userid' AND `ProductId` =' $productId'";         
        $result = mysqli_query($conn,$query);
       if($result){
         echo "delete works";
           }
    }

    public function show($conn,$userid){ //Shows all the products for specific user
        $query = "SELECT *  FROM `orderdetails` WHERE `UserId`='$userid'";
        $result = mysqli_query($conn,$query);  
        $update = "UPDATE  `TotalOrders` SET `OrderId`= `OrderId` + '1'  WHERE `UserId` = '$userid'";
        $runupdate = mysqli_query($conn ,$update);   
         $orderidquery  = "SELECT `OrderId` FROM `TotalOrders` WHERE `UserId` = '$userid' ";
         $runorderidquery = mysqli_query($conn, $orderidquery);
         $row = mysqli_fetch_array($runorderidquery);
         $order = $row[0];
        while($row = mysqli_fetch_array($result)){            
            $Items[] = $row;                  
            $Pid =  $row['ProductId'];
            $Uid = $row['UserId'];
            $time = $row['Time'];
            $status = "Processing";
            $statusinsert =  "INSERT INTO `Status`(`Userid`, `ProductId`, `status`,`purchased_on`, `OrderId` ) VALUES ('$Uid','$Pid','$status','$time','$order' )";    
            $satustres = mysqli_query($conn,$statusinsert); 
           
       }
         echo json_encode($Items);   
         $insertquery = "INSERT INTO `orderhistory` SELECT * FROM `orderdetails` WHERE `UserId`='$userid'";
         $insertres = mysqli_query($conn,$insertquery);        
        $delquery = "DELETE  FROM `orderdetails` WHERE  `UserId`='$userid'";
        $delres = mysqli_query($conn,$delquery);       
             
    }

    public function add($conn,$quantity,$price,$Id,$itemid){ //Adds to the orderdetails table
         $query = "UPDATE `orderdetails` SET Quantity = '$quantity' , price = '$price' WHERE UserId = '$Id' AND ProductId = '$itemid '";
         $result = mysqli_query($conn,$query);  
        if($result){
            echo "updated";
        }
    }

    public function dec($conn,$quantity,$price,$Id,$itemid){ //Delete the Product
        if($quantity == 0){
            $query = "DELETE FROM `orderdetails`WHERE UserId = '$Id' AND ProductId = '$itemid ' ";
            $result = mysqli_query($conn,$query);  
            if($result){
                echo "updated";
            }
        }
        else{
            $query = "UPDATE `orderdetails` SET Quantity = '$quantity', price = '$price' WHERE UserId = '$Id' AND ProductId = '$itemid '";
            $result = mysqli_query($conn,$query);  
            if($result){
                echo "updated";
            }
        }      
    }

    public function history($conn,$userid){ //Select from history table
        $query = "SELECT * , COUNT(Productid)AS count  FROM `orderhistory` WHERE `UserId`='$userid' GROUP BY DATE(`Time`)";
        $result = mysqli_query($conn,$query); 
      while($row = mysqli_fetch_array($result)){        
            $Item[] = $row ;
      }       
        echo json_encode($Item);     
    }

    public function vieworders($conn,$date ,$userid,$oid){ //Joining the table to view orders
            $pattern = "/[-\s:]/";
            $components = preg_split($pattern, $date);
            $year = $components[0];
            $month = $components[1];
            $datee = $components[2];
            $hour = $components[3];
             $min = $components[4];

            $query = "SELECT   *
              FROM `orderhistory`
              LEFT  JOIN `Status` ON orderhistory.ProductId= Status.ProductId AND orderhistory.Time = Status.purchased_on
              WHERE orderhistory.UserId = '$userid' AND orderhistory.Time LIKE '$year-$month-$datee %:%:%' AND Status.Userid='$userid'  AND Status.OrderId = '$oid' ";
 
                
            $result = mysqli_query($conn,$query); 
                 $Processing = "Processing";
                 $placed = "Placed";
                 $Cancelled = "cancelled";
                 date_default_timezone_set('Asia/Kolkata');
                 $Current_time= date('Y-m-d H:i:s');
                // $Item=[];
            while($row = mysqli_fetch_array($result)){      
                 
                $Pid = $row['ProductId'];
                $time = $row['Time'];
                $addingMinutes= date('Y-m-d H:i:s',strtotime($time. '+ 2 minute'));    
                
                if($row['status'] == "cancelled")  {                        
                        $row['status'] = $Cancelled;   
                        $row['disabled'] = true;                                  
                }
              
                
                else{
                    if( $addingMinutes > $Current_time ){      
                        $update = "UPDATE `Status` SET `status` = '$Processing' WHERE `Userid` = '$userid' AND `ProductId` = '$Pid' ";                                    
                        $row['status'] = $Processing;
                    }
                    else{                
                        $update = "UPDATE `Status` SET `status` = '$placed' WHERE `Userid` = '$userid' AND `ProductId` = '$Pid' ";
                        $row['status'] = $placed;
                        $row['disabled'] = true;
                    }
                    $upresult = mysqli_query($conn,$update); 
                }                 
                $Item[] = $row;              
            }   
                                           
          echo json_encode($Item);
    }

    public function cancel($conn,$Pid,$Uid,$time){ //Cancel the item       
        $Cancelled = "cancelled";       
        $delquery = "UPDATE `Status` SET `status` =  '$Cancelled'  WHERE  `UserId`='$Uid' AND `ProductId` = '$Pid' AND `purchased_on` = '$time' ";
         $delres = mysqli_query($conn,$delquery); 
        echo $Cancelled;
    }

    public function view($conn , $Uid , $date ){
        $pattern = "/[-\s:]/";
            $components = preg_split($pattern, $date);
            $year = $components[0];
            $month = $components[1];
            $datee = $components[2];
            $hour = $components[3];
             $min = $components[4];
        $query ="SELECT * FROM `Status` WHERE `Userid` = '$Uid' AND `purchased_on` LIKE '$year-$month-$datee %:%:%'   GROUP BY `OrderId`";
        $result = mysqli_query($conn ,$query);
        while($row = mysqli_fetch_array($result)){        
            $Item[] = $row;
        }       
         echo json_encode($Item);   
      // echo "here";
    }
}
$buymodel = new buymodel();
?>