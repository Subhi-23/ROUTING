<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

require_once 'model.php';
require_once 'controller.php';
$model = new model();
$controller = new controller($model);

$value = json_decode(file_get_contents('php://input'), true); 

$controller->check($value);
?>