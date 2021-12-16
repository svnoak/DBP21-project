<?php
//Startar session
session_start();
//Hämtar utilities.php
require_once("utilities.php");
//Kollar så att användaren är inloggad genom att kolla ifall det finns ett id i sessions
if (!isset($_SESSION["id"])) {
    //header("Location: /login.php");
    exit();
}

//Kollar så att contenttype är rätt
contentType("application/json");
//Kollar så att metoden är rätt
requestMethod("GET");

//Sparar det tillfälliga id't från sessions i variabeln id
$id = $_SESSION["id"];
//Kollar så att det finns ett id
if(isset($id)) {
    //Sparar användarens information i en variabel
    $data = getEntryByID("databas/user.json", $id);
} else {
    //Error om att man inte är inloggad
    sendJSON("You are not logged in");
}


?>