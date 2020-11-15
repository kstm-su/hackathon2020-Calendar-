<?php
session_start();
require_once 'vendor/autoload.php';
require_once 'funcitions.php';

$id_token = filter_input(INPUT_POST, 'id_token');
define('CLIENT_ID', '773118659092-ibvhnjki30sbdipg59rvno3tcp7vns8p.apps.googleusercontent.com');

$client = new Google_Client(['client_id' => CLIENT_ID]); 
$payload = $client->verifyIdToken($id_token);
if ($payload) {
    $userid = $payload['sub'];
}




$_SESSION['login'] = true;
exit;

?>
