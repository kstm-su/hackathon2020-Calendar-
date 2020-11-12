# hackathon2020-Calendar-

## 必須手順  
docker volume create --name=mysql_data  

## docker, docker-composeによるテスト用コマンド  
コンテナのビルド : docker-compose build  
コンテナの起動 : docker-compose up -d  
コンテナの生死確認 : docker-compose ps  
コンテナの終了&削除 : docker-compose down

## コンテナ名  
ウェブアプリケーションサーバ : web  
データベースサーバ : mysql  
