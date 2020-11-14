#使うDockerイメージ
FROM mysql:8.0.20

#ポートを開ける
#EXPOSE 3306

#MySQL設定ファイルをイメージ内にコピー
COPY ./my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf
#COPY ./world.sql /docker-entrypoint-initdb.d/world.sql
COPY ./test1.sql /docker-entrypoint-initdb.d/test1.sql

#docker runに実行される
CMD ["mysqld"]
