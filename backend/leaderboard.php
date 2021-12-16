<?php
//Hämtar utilities.php
require_once("utilities.php");

//Kollar så att contenttype är rätt
contentType("application/json");
//Kollar så att metoden är rätt
requestMethod("GET");

//Sätter datan till maximalt 10 characters
$data = getChars(10);
//Skickar tillbaka datan med alla 10 characters i en ny array
sendJSON(["data" => $data]);

?>