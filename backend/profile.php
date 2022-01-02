<?php
//Starts session
session_start();
//Fetching utilities.php
require_once("utilities.php");

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

//Checks if the user is logged in by checking if there is a stored ID in session
if (!isset($_SESSION["id"])) {
    //header("Location: /login.php");
    exit();
}

//Checks the contenttype
contentType("application/json");
//Checks the method
requestMethod("GET");

//Saving the ID from sessions in a variable
$id = $_SESSION["id"];
//Checks if an ID is given in session
if(isset($id)) {
    //Saving the user information in a variable
    $data = getEntryByID("databas/user.json", $id);
    sendJSON(["user" => $data]);
    exit();
} else {
    //Error if the user is not logged in
    sendJSON("You are not logged in", 400);
    exit();
}

?>