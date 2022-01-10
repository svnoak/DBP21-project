<?php
session_start();

require_once("utilities.php");

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

$id = $_SESSION["loggedInId"];

$user = createSet($_POST);

if ($method === "POST" && isset($_FILES["avatar"])) {
    $file = $_FILES["avatar"];
    $filename = $file["name"];
    $tempname = $file["tmp_name"];
    $size = $file["size"];
    $error = $file["error"];

    if( $error == 0 ) { 
    // Filen får inte vara större än ~400kb
    if ($size > (0.4 * 1000 * 10000)) {
        sendJSON("Please choose an image with a smaller size");
        exit();
    }

    // Hämta filinformation
    $info = pathinfo($filename);
    // Hämta ut filändelsen (och gör om till gemener)
    $ext = strtolower($info["extension"]);

    // Skapa ett unikt filnamn
    $uniqueFilename = $id."_avatar";

	/*$info = getEntryByID("databas/user.json", $id);
	if( isset($info["avatar"]) ){
		unlink($info["avatar"]);
	}*/

	$user["avatar"] = "$uniqueFilename.$ext";
    // Samma filnamn som den som laddades upp
    move_uploaded_file($tempname, "databas/avatars/$uniqueFilename.$ext");

    // echo "Uploaded the file!";

    // JSON-svar när vi testade med att skicka formuläret via JS
    //header("Content-Type: application/json");
    //echo json_encode(["message" => "Uploaded the file: $uniqueFilename"]);
    }
    elseif(  $error == 4){
    unlink($user["avatar"]);
    } 
else{
    sendJSON("Something went wrong, error: $error", 400);
}
}

updateUser($id, $user);

function createSet($data){
	$user = [];
	foreach( $data as $key => $val) {
		if( ! empty($data[$key]) ){
			$user[$key] = $data[$key];
		}
	}
	return $user;
}
