<?php
include 'index.php';
$value = json_decode(file_get_contents('php://input'), true); 
include '../database/connection.php'; 
$_email = $value['email']; 
$resultquery = "SELECT `firstname`,`sno` FROM `userdetails` WHERE `email`='$_email'";  
$result =mysqli_query($conn, $resultquery); 
$row = $result->fetch_assoc();
$id = $row['sno'];
$name = $row['firstname'];
echo json_encode($row);
?>