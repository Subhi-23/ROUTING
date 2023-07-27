<?php

class controller{
    private $model;

    public function __construct($model) {
        $this->model = $model;
    }

    public function check($value){  //Calls the function "Signin" /"Register"
         $functionCall=$value['hidden'];
        $result;        
        if($functionCall == 'signin'){
            $_email = $value['email'];
            $_password = $value['password'];
            $this->validEmail($_email);
            $this->model->$functionCall($_email,$_password);
        }
        if($functionCall == 'register'){
            $_firstName = $value['firstName'];
            $_email = $value['email'];
            $_password = $value['password'];
            $_confirmpassword = $value['confirm-password'];
            $_phonenumber = $value['phoneNumber'];
            if($this->validName($_firstName) && $this->validEmail($_email) && $this->validcpassword($_password,$_confirmpassword) && $this->validpassword($_password)){
                $this->model->$functionCall($_firstName,$_email,$_password,$_confirmpassword,$_phonenumber);
            }
        } 
                   
    }    
    
    private function validName($_firstName){ //Validation for Name
        $result;
        if(preg_match("/^[a-zA-Z0-9 ._-]*$/",$_firstName)){
            $result = true;
        }
        else {
            echo "invalid name";
            exit();
        }
        return $result;
    }

    private function validEmail($_email){ //Validation for Email
        $result;
        if( filter_var($_email,FILTER_VALIDATE_EMAIL)){
            $result = true;
        }
        else {
            echo "invalid email";
            exit();
             
        }
        return $result;
    }

    private function validpassword($_password){ //Password Validation
        $result;
        if(preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $_password)){
            $result = true;
        }
        else {
            echo "Password is not strong !!";
            exit();   
        }
        return $result;
    }

    private function validcpassword($_password,$_confirmpassword){ //Confirming Password
        $result;
        if($_password == $_confirmpassword){
            $result = true;
        }
        else {
            echo "password not match !!";
            exit();             
        }
        return $result;
    }
    
    private function validphno($_phonenumber){ //Phone number Validation
        $result;
        if(preg_match('/^[0-9]{10}+$/', $_phonenumber)){
            $result = true;
        }
        else {
            echo "invalid phone Number !!";
            exit();   
        }
        return $result;
    }
}
?>