<?php

require_once 'login1.php'

function connectDb() {
    try{
        return new PDO($db_host, $db_username, $db_password);
    } catch (PDOException $e){
        echo $e->getMessage();
        exit;
    }

}
?>
