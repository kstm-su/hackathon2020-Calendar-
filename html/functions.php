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

//$test = gen_teamid();
//echo $test;


function join_team($teamid, $credential){
    $dbh = connectDb();
    $sth = $dbh->prepare("INSERT INTO Users (userid, teamid) VALUES (:id, :teamid);");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    $sth->bindValue(':teamid', $teamid, PDO::PARAM_STR);
    $sth->execute();

    return 0;

}

function add_team($teamname, $ismyself, $credential) {
    $teamid = gen_teamid(); 
    $dbh = connectDb();
    $sth = $dbh->prepare("INSERT INTO Teams (teamid, teamname, ismyself) VALUES (:teamid, :teamname, :ismyself);");
    $sth->bindValue(':teamid', $teamid, PDO::PARAM_STR);
    $sth->bindValue(':teamname', $teamname, PDO::PARAM_STR);
    $sth->bindValue(':ismyself', $ismyself, PDO::PARAM_INT);
    $sth->execute();
    
    join_team($teamid, $credential);
    
    return 0;
    
}





?>
