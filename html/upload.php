<?php

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['name' => $_POST['input_val']]);

//echo <<<_END
//<html>
//  <head>
//    <title>フォームテスト</title>
//  </head>
//  <body>
//  <form method="post" action="upload.php">
//   what's your name?
//   <input type="text" name="name" />
//   <input type="submit" />
//  </form>
//  </body>
//</html>
//_END;


 // require_once 'login.php';
 // try{
 //   $pdo = new PDO($db_host,$db_username,$db_password);
 //   $sql = "select * from city;";
 //   $res = $pdo->query($sql);
 //   // echo "$value";
 //   foreach( $res as $value ) {
 //     echo "$value[Name]<br>";
 //   }
 // } catch (PDOException $e) {
 //   exit('データベースに接続できませんでした。' . $e->getMessage());
 //   die();
 // }
 // $pdo = null;

// echo <<<_END
// <html><head>
// <title>PHP Form Upload</title></head>
// </head>
// <body>
// <form method='post' action='upload.php' enctype='multipart/form-data'>
// Select File: <input type='file' name='filename' size='10'/>
// <input type='submit' value='Upload'/>
// </form>
// _END;
// if($_FILES){
//   $name = $_FILES['filename']['name'];
//   move_uploaded_file($_FILES['filename']['tmp_name'], $name);
//   echo "Uploaded image '$name' <br /><img src='$name' />";
// }
// echo "</body></html>"
?>
