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

//Fetching utilities.php
require_once("utilities.php");

$dataPHP = file_get_contents("php://input");
$requestData = json_decode($dataPHP, true);


contentType("application/json");
$data = openJSON("databas/user.json");

if(isset($requestData["username"], $requestData["password"])) {
    $username = $requestData["username"];
    $password = $requestData["password"];
    $foundUser = null;
    foreach($data as $user) {
        if($user["username"] === $username && $user["password"] === $password) {
            $foundUser = $user;
        }
    }
    //Checks that foundUser has been given a user
    if($foundUser !== null) {
        //Starts a session and saves $foundUser ID in session ID
        session_start();
        $_SESSION["id"] = $foundUser["id"];
        $userID = $_SESSION["id"];
        sendJSON(["userID"=>$userID], 200);
        exit();
    } else {
        //Retuns a message that something when wrong when atempting to login
        sendJSON("User not found", 404);
        exit();
    }
} else{
    sendJSON("PASSWORD OR USERNAME MISSING", 400);
    exit();
}

?>