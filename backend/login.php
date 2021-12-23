<?php
//Fetching utilities.php
require_once("utilities.php");
//The information sent to the server
$dataPHP = file_get_contents("php://input");
//Makes JSON to an associativ array
$requestData = json_decode($dataPHP, true);

//Checks the contenttype
contentType("application/json");
//Checks the method
requestMethod("POST");
//Fetching data from database
$data = openJSON("databas/user.json");

//Checks if something was sent through POST
if(isset($_POST["username"], $_POST["password"])) {
    //Saves username och password in variables
    $username = $_POST["username"];
    $password = $_POST["password"];
    //Setting necessary variables
    $foundUser = null;
    //Loops through user.json and looks for a user that has the matching username/password as sent through POST
    foreach($data as $user) {
        if($user["username"] === $username && $user["password"] === $password) {
            //Puts the found user in the variable foundUser
            $foundUser = $user;
        }
    }
    //Checks that foundUser has been given a user
    if($foundUser !== null) {
        //Starts a session and saves $foundUser ID in session ID
        session_start();
        $_SESSION["id"] = $foundUser["id"];
        $userID = $_SESSION["id"];
        //Returns a user ID
        //echo $userID; //Test for Insomnia
        return $userID;
    } else {
        //Retuns a message that something when wrong when atempting to login
        sendJSON("Login does not exist");
    }
}

?>