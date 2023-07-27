<?php

require 'buymodel.php';

class buyItem extends buymodel{
   
    public function __construct( ){
        include "../database/headers.php";
        include "../database/connection.php";
        $value = json_decode(file_get_contents('php://input'), true);       
        if($value['hidden'] == 'insertproduct'){
            $this->insertproduct($conn,$value);
        }
        else if($value['hidden'] == 'deleteproduct'){
            $this->deleteproduct($conn,$value);
        }  
        else if($value['hidden']=='buyproduct'){
            $this->showproduct($conn,$value);
        }   
        elseif($value['hidden'] == 'addquantity'){
            $this->addquantity($conn,$value);
        }    
        elseif($value['hidden'] == 'decquantity'){
            $this->decquantity($conn,$value);
        } 
        elseif($value['hidden'] == 'orderhistory'){
            $this->orderhistory($conn,$value);
        }     
        elseif($value['hidden'] == 'vieworders') {
            $this->vieworder($conn,$value);
        }
        elseif($value['hidden'] == 'cancel'){
            $this->cancelitem($conn,$value);
        }
        elseif($value['hidden'] == 'viewbygroup'){
            $this->viewbygroup($conn,$value);
        }
    }

    public function viewbygroup($conn,$value){
        $uid = $value['Id'];
        $date = $value['date'];
       // $oid = $value['Oid'];
        $this->view($conn,$uid ,$date);
    } 

    public function insertproduct($conn,$value){ //Calls insert
        $Id = $value['Id']; 
        $itemid = $value['itemid'];
        $itenname = $value['itemname'];
        $price = $value['price'];
        $quantity = $value['quantity'];        
       $this->insert($conn,$Id,$itemid,$itenname,$price,$quantity);        
    }

    public function deleteproduct($conn,$value){ //Calls Delete function
        $userid = $value['Id'];
        $productId = $value['itemid'];       
        $this->delete($conn,$userid,$productId);      
    }

    public function showproduct($conn ,$value){ //Calls Show function
        $userid = $value['Id'];      
        $this->show($conn,$userid);               
    }

    public function addquantity($conn,$value){ //Calls Add function
        $Id = $value['Id'];
        $itemid = $value['itemid'];
        $itenname = $value['itemname'];        
        $count = $value['count'];
        $count = $count+1;
        $price =  $value['price']  ;
        $quantity = $count* $value['quantity'];         
        $this->add($conn,$quantity,$price,$Id,$itemid);                       
    }

    public function decquantity($conn,$value){ //Calls Dec Function
        $Id = $value['Id'];
        $itemid = $value['itemid'];
        $itenname = $value['itemname'];
        $price = $value['price'];
        $count = $value['count'];
        $count = $count-1;
        $quantity = $count* $value['quantity'];      
        $this->dec($conn,$quantity,$price,$Id,$itemid);            
    }

    public function orderhistory($conn,$value){ //Calls history function
        $userid = $value['Id'];        
        $this->history($conn,$userid );     
    }

    public function vieworder($conn,$value){ //Calls vieworder
        $userid = $value['Id'];
        $date = $value['date'];    
        $oid = $value['Oid'];  
        $this->vieworders($conn,$date,$userid, $oid );
    }
    
    public function cancelitem($conn,$value){ //Calls cancel function
        $userid = $value['Id'];
        $Pid = $value['Pid'];
        $date = $value['date'];
        $this->cancel($conn,$Pid,$userid,$date );
    }
}
$obj = new buyItem(); 

?>

 


 