<?php
session_start();
require_once 'vendor/autoload.php';
require_once 'functions.php';
require_once 'json.php';

$id_token = filter_input(INPUT_POST, 'id_token');
define('CLIENT_ID', '773118659092-ibvhnjki30sbdipg59rvno3tcp7vns8p.apps.googleusercontent.com');

$client = new Google_Client(['client_id' => CLIENT_ID]); 
$payload = $client->verifyIdToken($id_token);
if ($payload) {
    $user_credential = $payload['sub'];
}

function hashing($user_credential){
    $hash = password_hash($user_credential, PASSWORD_DEFAULT, array('cost'=> 10));
    return $hash;
}

function new_user($hash){
    add_team('default', '1', $hash);
    return 0;
}


function isnewuser($user_credential){
    $hash = hashing($user_credential);
    $user_teams = teams_json($hash);
    if($user_teams['teamid']){
        return 0;
    }else{
        new_user($hash);
        return 1;
    } 
}


$bool = isnewuser($user_credential);
if($bool){
    print('Authorization Failed')
}


$_SESSION['login'] = true;
exit;

?>
