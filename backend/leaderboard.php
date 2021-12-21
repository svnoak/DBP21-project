<?php
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