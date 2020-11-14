<?php

$filename = 'words.txt';
$content = file_get_contents($filename);

$array = explode("\n", $content); // とりあえず行に分割
$array = array_map('trim', $array); // 各行にtrim()をかける
$array = array_filter($array, 'strlen'); // 文字数が0の行を取り除く
$array = array_values($array); // これはキーを連番に振りなおしてるだけ

$json = json_encode($array);
file_put_contents("words.json", $array);

?>
