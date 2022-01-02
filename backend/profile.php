<?php
//Starts session
session_start();
//Fetching utilities.php
require_once("utilities.php");
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