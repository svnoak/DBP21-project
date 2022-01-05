<?php
require_once("utilities.php");

contentType("application/json");
requestMethod("PATCH");

//NOT DONE

//Info som skickats till servern
$dataPHP = file_get_contents("php://input");
//Gör JSON till en associativ array
$requestData = json_decode($dataPHP, true);

/* $username = $requestData["username"];
$password = $requestData["password"]; 
$email = $requestData["email"];
$avatar = $requestData["avatar"];

updateUser($_POST["id"], $data); */

sendJSON(["message" => $dataPHP]);
exit();
?>