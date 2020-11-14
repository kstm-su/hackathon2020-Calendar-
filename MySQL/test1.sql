
CREATE DATABASE `test1` DEFAULT CHARACTER SET utf8mb4;
USE `test1`;


CREATE TABLE Users (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    userid INTEGER NOT NULL,
    username TEXT NOT NULL,
    teamid TEXT NOT NULL
);

CREATE TABLE Teams (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    teamid TEXT NOT NULL,
    teamname TEXT NOT NULL,
    ismyself INTEGER
);

CREATE TABLE Events (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    teamid TEXT NOT NULL,
    eventid TEXT NOT NULL,
    eventname TEXT, starttime DATETIME,
    endtime DATETIME, priority INTEGER NOT NULL,
    color TEXT,
    memo TEXT,
    istodo INTEGER DEFAULT 0,
    istimetable INTEGER DEFAULT 0
);


INSERT INTO Users (userid, username, teamid) VALUES ('001','passerby1','clubroom-imbibe-compost');
INSERT INTO Users (userid, username, teamid) VALUES ('002','passerby2','quondam-chimney-wont');
INSERT INTO Users (userid, username, teamid) VALUES ('003','passerby3','silage-croon-lavish');
INSERT INTO Teams (teamid, teamname, ismyself) VALUES('clubroom-imbibe-compost','default','1');
INSERT INTO Teams (teamid, teamname, ismyself) VALUES('quondam-chimney-wont','default','1');
INSERT INTO Teams (teamid, teamname, ismyself) VALUES('silage-croon-lavish','default','1');
INSERT INTO Teams (teamid, teamname, ismyself) VALUES('militia-manteau-twill','kstm','0');
INSERT INTO Users (userid, username, teamid) VALUES ('001','passerby1','militia-manteau-twill');
INSERT INTO Events (teamid, eventid, eventname, starttime, endtime, color, priority, memo, istodo, istimetable) VALUES('militia-manteau-twill','aaa', 'kstmLT', '2020-11-14 20:00:00', '2020-11-14 21:00:00', 'f0f8ff', '1', 'MEMOTEST', '0', '0');
INSERT INTO Events (teamid, eventid, eventname, starttime, endtime, color, priority, memo, istodo, istimetable) VALUES('clubroom-imbibe-compost','bbb', 'KADAI-1', '2020-11-14 21:00:00', '2020-11-14 21:00:00', 'ff6347', '0', 'MEMO-KADAI', '1', '0');
INSERT INTO Events (teamid, eventid, eventname, starttime, endtime, color, priority, memo, istodo, istimetable) VALUES('clubroom-imbibe-compost','ccc', 'KOUGI-1', '2020-11-18 10:40:00', '2020-11-18 12:10:00', '32cd32', '0', 'MEMO-KOUGI', '0', '1');
