<?php

require_once 'login1.php';

function connectDb() {
    try{
        return new PDO($db_host, $db_username, $db_password);
    } catch (PDOException $e){
        echo $e->getMessage();
        exit;
    }

}

function gen_teamid() {
    $jsonurl = './words/words.json';
    $json = file_get_contents($jsonurl);
    $words = json_decode($json, true);
    $keys = array_rand($words, 3);
    shuffle($keys);
    $teamid = "";
    
    foreach($keys as $key){
        $teamid = $teamid.'-'.$words[$key];
    }
    
    $teamid = preg_replace('[\']','',$teamid);
    $teamid = substr($teamid, 1);
    return $teamid;
}

$test = gen_teamid();
echo $test;








?>
