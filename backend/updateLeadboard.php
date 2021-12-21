<?php
require_once("utilities.php");

contentType("application/json");
requestMethod("PATCH");

//NOT TESTED

//Info som skickats till servern
$dataPHP = file_get_contents("php://input");
//Gör JSON till en associativ array
$requestData = json_decode($dataPHP, true);

$name = $requestData["name"];
$highscore = $requestData["highscore"];

if(!empty($name && $highscore)) {
    $data = updateLeaderboard(
        $name,
        $highscore
    );
    sendJSON($data); //hm skickar inte tillbaka något men skapar en användare!
}

?>