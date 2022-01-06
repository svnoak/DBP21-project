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

require_once("utilities.php");

contentType("application/json");
requestMethod("PATCH");

//Info som skickats till servern
$dataPHP = file_get_contents("php://input");
//Gör JSON till en associativ array
$data = json_decode($dataPHP, true);

session_start();

$id = $_SESSION["id"];

$user = createSet($data);
updateUser($id, $user);
exit();

function createSet($data){
	$user = [];
	foreach( $data as $key => $val) {
		if( ! empty($data[$key]) ){
			$user[$key] = $data[$key];
		}
	}
	return $user;
}

?>

