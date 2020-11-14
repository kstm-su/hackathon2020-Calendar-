# hackathon2020-Calendar-

## 必須手順  
コンテナのビルド前に行うコマンド  
docker-compose down --rmi all --volumes --remove-orphans  
docker volume create --name=mysql_data  

コンテナのビルド後に行うコマンド  
docker exec -it mysql bash -p  
mysql -u root -p  
use mysql;  
alter user 'root'@'%' identified with mysql_native_password by パスワード;  
select user, host, plugin from user;  

## docker, docker-composeによるテスト用コマンド  
コンテナのビルド : docker-compose build  
コンテナの起動 : docker-compose up -d  
コンテナの生死確認 : docker-compose ps  
コンテナの終了&削除 : docker-compose down  

## コンテナ名  
ウェブアプリケーションサーバ : web  
データベースサーバ : mysql  
