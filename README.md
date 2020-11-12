# hackathon2020-Calendar-

##必須手順  
.envファイルの
LINUX_MYSQL_UID  
LINUX_MYSQL_GID  
を、下記コマンドの結果の値に書き換えてください  
id -u $USER  
id -g $USER  

##docker, docker-composeによるテスト用コマンド  
コンテナのビルド : docker-compose build  
コンテナの起動 : docker-compose up -d  
コンテナの生死確認 : docker-compose ps  
コンテナの終了&削除 : docker-compose down

##コンテナ名  
ウェブアプリケーションサーバ : web  
データベースサーバ : mysql  
