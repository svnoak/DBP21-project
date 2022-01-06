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

    // Kontrollera att allt gick bra med PHP
    // (https://www.php.net/manual/en/features.file-upload.errors.php)
    if ($error !== 0) {
        sendJSON("Something went wrong, please try again!", 400);
        exit();
    }

    // Filen får inte vara större än ~400kb
    if ($size > (0.4 * 1000 * 10000)) {
        sendJSON("Please choose an image with a smaller size", 400);
        exit();
    }

    // Hämta filinformation
    $info = pathinfo($filename);
    // Hämta ut filändelsen (och gör om till gemener)
    $ext = strtolower($info["extension"]);

    // Konvertera från int (siffra) till en sträng,
    // så vi kan slå samman dom nedan.
    $time = (string) time(); // Klockslaget i millisekunder
    // Skapa ett unikt filnamn
    $uniqueFilename = sha1("$time$filename");

	$info = getEntryByID("databas/user.json", $id);
	if( isset($info["avatar"]) ){
		unlink($info["avatar"]);
	}

	$user["avatar"] = "avatars/$uniqueFilename.$ext";
    // Samma filnamn som den som laddades upp
    move_uploaded_file($tempname, "uploads/$uniqueFilename.$ext");

    // echo "Uploaded the file!";

    // JSON-svar när vi testade med att skicka formuläret via JS
    //header("Content-Type: application/json");
    //echo json_encode(["message" => "Uploaded the file: $uniqueFilename"]);
    exit();
}
sendJSON("HELP");
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
