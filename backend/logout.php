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

    session_start();
    unset($_SESSION["loggedInId"]);
    session_destroy();
    exit();
?>