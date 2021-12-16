<?php
//Hämtar utilities.php
require_once("utilities.php");
//Info som skickats till servern
$dataPHP = file_get_contents("php://input");
//Gör JSON till en associativ array
$requestData = json_decode($dataPHP, true);

//Kollar så att contenttype är rätt
contentType("application/json");
//Kollar så att metoden är rätt
requestMethod("POST");

$data = openJSON("databas/user.json");

//Kollar om något kommit in med POST
if(isset($requestData["username"], $requestData["password"])) {
    //Sparar ner username och password i variabler
    $username = $requestData["username"];
    $password = $requestData["password"];
    //Sätter variabeln för foundUser till null
    $foundUser = null;
    //Loopar user.json och letar efter en användare som matchar med det som skickats med POST
    foreach($data as $user) {
        if($user["username"] === $username && $user["password"] === $password) {
            //Läggar den hittade användaren i variabeln foundUser
            $foundUser = $user;
        }
    }
    //Kollar så att foundUser har fått en användare
    if($foundUser !== null) {
        //Startar en session och sparar $foundUser id't i session id
        session_start();
        $_SESSION["id"] = $foundUser["id"];
        $userID = $_SESSION["id"];
        //Returnerar användarens ID
        echo $userID;
        return $userID;
    } else {
        //Retunerar ett felmeddelande att inloggningen inte är rätt
        sendJSON("Login does not exist");
    }
}

?>