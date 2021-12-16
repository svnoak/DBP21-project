<?php
require_once("utilities.php");

contentType("application/json");
requestMethod("GET");

$data = getTopCharacters(200);
sendJSON($data);

?>