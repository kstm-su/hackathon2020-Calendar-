<?php
require_once 'json.php';

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$response = "";
$querydata = $data["data"];

switch($data["type"]){
  case 'newUser': //{userid:'a'}
    break;

  case 'loginUser'://{userid:'a'}
    $response = event_json($querydata["userid"]);
    break;

  case 'newTeam'://{userid:'a', teamid:'c'}
    break;

  case 'newEvent'://{userid:'a', teamid:"kstm", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
    $response = event_json($querydata["userid"]);
    break;

  case 'deleteEvent'://{userid:'a', teamid:"kstm", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
    break;

  case 'joinTeam':// {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
    break;

  case 'leaveTeam':// {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
    break;

  case 'deleteUser'://{userid:'a'}
    break;
}

echo json_encode($response,JSON_UNESCAPED_UNICODE);;

?>
