<?php

require_once('json.php');





$json = file_get_contents("php://input");

$data = json_decode($json, true);

$result = event_json($data);
jsonResponse($result);



?>
