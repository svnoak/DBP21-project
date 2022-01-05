<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require_once("utilities.php");

$dataPHP = file_get_contents("php://input");
$requestData = json_decode($dataPHP, true);

contentType("application/json");

$username = $requestData["username"];
$password = $requestData["password"]; 
$email = $requestData["email"];
$avatar = "Placeholder";

if(!empty($username && $password && $email)) {
    createUser(
        $username,
        $password,
        $email,
        $avatar
    );
    sendJSON("Created user", 200);
    exit();
} else {
    sendJSON("Something went wrong, try again!", 404);
    exit();
}


?>