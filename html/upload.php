<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$response = "";
switch($data["type"]){
  case 'newUser':
    
    break;
  case 'loginUser':
    break;
  case 'newTeam':
    break;
  case 'newEvent':
    break;
  case 'joinTeam':
    break;
  case 'leaveTeam':
    break;
  case 'deleteTeam':
    break;
  case 'deleteUser':
    break;
}

echo $response;

?>
