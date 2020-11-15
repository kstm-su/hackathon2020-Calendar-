<?php

require_once 'login1.php';
require_once 'gen_uuid.php';

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

function leave_team($teamid ,$credential){
    $dbh = connectDb();
    $sth = $dbh->prepare("DELETE FROM Users WHERE userid=:id AND teamid=:teamid);");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    $sth->bindValue(':teamid', $teamid, PDO::PARAM_STR);
    $sth->execute();
    
    return 0;
}


function update_team($teamid, $teamname, $color) {
    $dbh = connectDb();
    $sth = $dbh->prepare("UPDATE FROM Teams SET teamname=:teamname, color=:color WHERE teamid=:teamid;");
    $sth->bindValue(':teamid', $teamid, PDO::PARAM_STR);
    $sth->bindValue(':teamname', $teamname, PDO::PARAM_STR);
    $sth->bindValue(':color', $color, PDO::PARAM_STR);
    $sth->execute();
    
    return 0;
}




function add_event($teamid, $eventname, $starttime, $endtime, $priority, $memo, $istodo, $istimetable){
    $eventid = uuidv4::generate();
    $dbh = connectDb();
    $sth = $dbh->prepare("INCERT INTO Events (teamid, eventid, eventname, starttime, endtime, priority, memo, istodo, istimetable) VALUES (:teamid, :eventid, :eventname, :starttime, :endtime, :priority, :memo, :istodo, :istimetable);");

    $sth->bindValue(':teamid', $teamid, PDO::PARAM_STR);
    $sth->bindValue(':eventid', $eventid, PDO::PARAM_STR);
    $sth->bindValue(':eventname', $eventname, PDO::PARAM_STR);
    $sth->bindValue(':starttime', $starttime, PDO::PARAM_STR);
    $sth->bindValue(':endtime', $endtime, PDO::PARAM_STR);
    $sth->bindValue(':priority', $priority, PDO::PARAM_INT);
    $sth->bindValue(':memo', $memo, PDO::PARAM_STR);
    $sth->bindValue(':istodo', $istodo, PDO::PARAM_INT);
    $sth->bindValue(':istimetable', $istimetable, PDO::PARAM_INT);
    $sth->execute();
    
    return 0;
}

function del_event($eventid){
    $dbh = connectDb();
    $sth = $dbh->prepare("DELETE FROM Events WHERE eventid=:eventid;");
    $sth->bindValue(':eventid', $eventid, PDO::PARAM_STR);
    $sth->execute();
    
    return 0;
}

function update_event($eventid, $eventname, $starttime, $endtime, $priority, $memo, $istodo, $istimetable){
    
    $dbh = connectDb();
    $sth = $dbh->prepare("UPDATE Events SET eventname=:eventname, starttime=:starttime, endtime=:endtime, priority=:priority, memo=:memo, istodo=:istodo, istimetable=:istimetable WHERE eventid=:eventid;"); 
    $sth->bindValue(':eventid', $eventid, PDO::PARAM_STR);
    $sth->bindValue(':eventname', $eventname, PDO::PARAM_STR);
    $sth->bindValue(':starttime', $starttime, PDO::PARAM_STR);
    $sth->bindValue(':endtime', $endtime, PDO::PARAM_STR);
    $sth->bindValue(':priority', $priority, PDO::PARAM_INT);
    $sth->bindValue(':memo', $memo, PDO::PARAM_STR);
    $sth->bindValue(':istodo', $istodo, PDO::PARAM_INT);
    $sth->bindValue(':istimetable', $istimetable, PDO::PARAM_INT);
    $sth->execute();
    
    return 0;
}

function del_user($credential){
    $dbh = connectDb();
    
    $teamid_delete = $dbh->prepare("SELECT teamid FROM Teams WHERE teamid IN (SELECT teamid FROM Users WHERE userid=:id) AND ismyself='1';");
    $teamid_delete->bindValue(':id', $credential, PDO::PARAM_STR);
    $teamid_delete->execute();
    
    
    $sth = $dbh->prepare("DELETE FROM Events WHERE teamid=:teamid_delete;");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    $sth->bindValue(':teamid_delete', $teamid_delete, PDO::PARAM_STR);
    $sth->execute();
    
    $sth = $dbh->prepare("DELETE FROM Teams WHERE teamid=:teamid_delete;");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    $sth->bindValue(':teamid_delete', $teamid_delete, PDO::PARAM_STR);
    $sth->execute();
    
    $sth = $dbh->prepare("DELETE FROM Users WHERE userid=:id;");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    $sth->execute();
    
    $sth = $dbh->prepare("DELETE FROM Events WHERE teamid IN (SELECT teamid FROM Teams WHERE teamid NOT EXISTS (SELECT teamid FROM Users));");
    $sth->execute();
    
    $sth = $dbh->prepare("DELETE FROM Teams WHERE teamid NOT EXISTS (SELECT teamid FROM Users);");
    $sth->execute();
     
    return 0;
}





?>
