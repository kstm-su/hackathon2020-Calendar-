<?php

require_once('login1.php');
require_once('functions.php');

mb_language("uni");
mb_internal_encoding("utf-8");
mb_http_input("auto");
mb_http_output("utf-8");

function event_json($credential) {
    $dbh = connectDb();
    $sth = $dbh->prepare("SELECT * FROM Events WHERE teamid IN (SELECT teamid FROM Users WHERE userid=:id);");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    // to prevent SQLinjection attack
    $sth->execute();

    $result = array();
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $result[]=array(
            'teamid'=>$row['teamid'],
            'eventid'=>$row['eventid'],
            'eventname'=>$row['eventname'],
            'starttime'=>$row['starttime'],
            'endtime'=>$row['endtime'],
            'priority'=>$row['priority'],
            'memo'=>$row['memo'],
            'istodo'=>$row['istodo'],
            'istimetable'=>$row['istimetable'],
        );
    }
    return $result;
}


function teams_json($credential) {
    $dbh = connectDb();

    $sth = $dbh->prepare("SELECT teamid, teamname, ismyself FROM Teams WHERE teamid IN (SELECT teamid FROM Users WHERE userid=:id);");
    $sth->bindValue(':id', $credential, PDO::PARAM_STR);
    //to prevent SQLinjection attack
    $sth->execute();

    $result = array();
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $result[]=array(
            'teamid'=>$row['teamid'],
            'teamname'=>$row['teamname'],
            'ismyself'=>$row['ismyself']
        );
    }
    return $result;
}


function team_json($teamid) {
    $dbh = connectDb();

    $sth = $dbh->prepare("SELECT teamid, teamname, ismyself FROM Teams WHERE teamid=:id;");
    $sth->bindValue(':id', $teamid, PDO::PARAM_STR);
    //to prevent SQLinjection attack
    $sth->execute();

    $result = array();
    while($row = $sth->fetch(PDO::FETCH_ASSOC)){
        $result[]=array(
            'teamid'=>$row['teamid'],
            'teamname'=>$row['teamname'],
            'ismyself'=>$row['ismyself']
        );
    }
    return $result;
}



function jsonResponse($value){
    header('Content-type: application/json');
    echo json_encode($value);
    return 0;
}
?>
