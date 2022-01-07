<?php
session_start();

$method = $_SERVER["REQUEST_METHOD"];

//Fetching utilities.php
require_once("utilities.php");

// Den sk. preflight förfrågan ("får jag anropa dig")
if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit(); 
}

// Alla är vällkommna
header("Access-Control-Allow-Origin: *");

//Checks if the user is logged in by checking if there is a stored ID in session
if (!isset($_SESSION["loggedInId"])) {
    //header("Location: /login.php");
    sendJSON("abort");
    exit();
}

//Checks the contenttype
contentType("application/json");
//Checks the method
requestMethod("POST");

//Saving the ID from sessions in a variable
$id = $_SESSION["loggedInId"];

//Checks if an ID is given in session
if(isset($id)) {
	$data = getEntryByID("databas/user.json", $id);	
	$user = [
        "username" => $data["username"], 
        "email" => $data["email"],
        "avatar" => $data["avatar"]
    ];
    sendJSON(["user"=>$user], 200);
    exit();
} else {
    //Error if the user is not logged in
    sendJSON("You are not logged in", 400);
    exit();
}
