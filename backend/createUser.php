<?php

$method = $_SERVER["REQUEST_METHOD"];

// Den sk. preflight förfrågan ("får jag anropa dig")
if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit();
} 

// Alla är vällkommna
header("Access-Control-Allow-Origin: *");

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
