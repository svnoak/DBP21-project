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

//Skapar variabler med innehåll från POST
/* $username = $requestData["username"];
$password = $requestData["password"]; 
$email = $requestData["email"];
$avatar = $requestData["avatar"]; */
//if(isset($_POST["submit"])) {
    $username = $_POST["username"];
    $password = $_POST["password"]; 
    $email = $_POST["email"];
    $avatar = "placeholder";

    //Kollar så att inte något fält är tomt
    if(!empty($username && $password && $email)) {
        //Skapar den nya användaren
        $data = createUser(
            $username,
            $password,
            $email,
            $avatar
        );
        sendJSON($data); //hm skickar inte tillbaka något men skapar en användare!
    } else {
        //Error om det inte gick att skapa användaren
        sendJSON("try again");
    }
//}


?>