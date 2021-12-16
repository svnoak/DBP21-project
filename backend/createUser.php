<?php
session_start();
require_once("utilities.php");
//Info som skickats till servern
$dataPHP = file_get_contents("php://input");
//Gör JSON till en associativ array
$requestData = json_decode($dataPHP, true);

contentType("application/json");
requestMethod("POST");

$username = $requestData["username"];
$password = $requestData["password"]; 
$email = $requestData["email"];
$avatar = $requestData["avatar"];

if(!empty($username && $password && $email && $avatar)) {
    $data = createUser(
        $username,
        $password,
        $email,
        $avatar
    );
    sendJSON($data); //hm skickar inte tillbaka något men skapar en användare!
} else {
    sendJSON("try again");
}

?>