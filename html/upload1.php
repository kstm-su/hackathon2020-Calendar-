<?php

require_once 'login1.php';
try{
    $pdo = new PDO($db_host,$db_username,$db_password);
    $sql_event = "SELECT teamid, eventid, eventname, starttime, endtime, priority, memo, istodo, istimetable FROM Events WHERE teamid IN (SELECT teamid FROM User WHERE userid=:id);";
    //Use $sql_event->bindValue(':id', $id, PDO::PARAM_STR); at a later
    
    
    if(empty($_POST['input_val'])){
        exit
    }
    
    function createResponse_event($res_event){
        $result = [
            
        ]
        return $result;
    }
    
    
    
   $res = $pdo->query($sql);
   // echo "$value";
   foreach( $res as $value ) {
     echo "$value[Name]<br>";
   }
 } catch (PDOException $e) {
   exit('データベースに接続できませんでした。' . $e->getMessage());
   die();
 }
 $pdo = null;

?>
