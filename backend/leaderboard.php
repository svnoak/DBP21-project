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

//Hämtar utilities.php
require_once("utilities.php");

//Kollar så att contenttype är rätt
contentType("application/json");
//Kollar så att metoden är rätt
requestMethod("GET");

//Saving the top 10 characters in an array
$data = getChars(10);
//Skickar tillbaka datan med alla 10 characters i en ny array
sendJSON(["data" => $data]);

?>