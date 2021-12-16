<?php
require_once("utilities.php");

contentType("application/json");
requestMethod("GET");

$data = getChars(2);
sendJSON(["data" => $data]);

?>