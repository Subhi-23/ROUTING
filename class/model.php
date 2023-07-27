<?php 
 

 class model{
    public $conn;   
    public function signin($_email,$_password){
        $conn = new mysqli("localhost","root","","user");
        $sql = "SELECT * FROM userdetails WHERE email = '$_email'";  //query to get email
        $result = mysqli_query($conn, $sql); //implementing query with connection         
        $row = mysqli_fetch_assoc($result);//Fetching the result from the query                
        $decrypt = md5($_password);      
        if ($result->num_rows > 0) { //If we get rows -> success or invalid username
           if($decrypt == $row['password']){
            echo " ";
           }
           else{
            echo "incorrect password";
           }
           
        } else {            
            echo "Invalid username or password.";
        }
    }
    public function register($_firstName,$_email,$_password,$_confirmpassword,$_phonenumber){
        $conn = new mysqli("localhost","root","","user");
        //$hashed_password = password_hash($_password, PASSWORD_DEFAULT);
        $encrypt =md5($_password);
        $duplicate = "SELECT * FROM userdetails WHERE email = '$_email' OR phno = '$_phonenumber'";    //Query for already user exists or not 
        $duplicate_result = mysqli_query($conn, $duplicate);
        $result = true;
        if ($duplicate_result->num_rows > 0) { //if rows found->user already exists
           $result =false;
            echo "<h6> email or phno already registerd! </h6>";         
        } 
        if($_confirmpassword != $_password){ //If password not matches confirm password !!
           $result=false;
            echo "<h3> password not matched!! </h3>";
        }
        if($result){
            $sql = "INSERT INTO `userdetails`(`firstname`, `email`, `password`, `phno`)
            VALUES ('$_firstName','$_email','$encrypt','$_phonenumber')";  //Query for inserting values to database                
            $result = mysqli_query($conn, $sql);                
            if($result){ 
                                                                      
                echo "Registration Succesfull back to signin page";                
            }
        }                        
    }
 }
?>