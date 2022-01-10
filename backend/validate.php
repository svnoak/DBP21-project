<?php
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

contentType("application/json");
requestMethod("GET");

$filePath = "databas/user.json";

if( ! file_exists($filePath)) {
    sendJSON("File not found", 404);
    exit();
}
?>