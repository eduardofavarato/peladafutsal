CREATE TABLE player(
	player_name varchar(50) primary key
);

CREATE TABLE match(
	match_id int generated always as identity(start with 1 increment by 1) primary key,
	match_date date not null unique,
	winner boolean, --0 - azul | 1 - vermelho
	is_ended boolean default 0 --0 - não | 1 - sim
);

CREATE TABLE match_player(
	id int generated always as identity(start with 1 increment by 1) primary key,
   match_id int not null,
   player_name varchar(50) not null,
   team boolean not null, --0 - azul | 1 - vermelho
   goals_scored smallint default 0,
   foreign key (match_id) references match(match_id),
   foreign key (player_name) references player(player_name)
);




-- CREATE TABLE PLAYER(
-- 	PLAYER_NAME VARCHAR(50) PRIMARY KEY,
-- 	POINTS SMALLINT DEFAULT 0,
-- 	MATCHES_PLAYED SMALLINT DEFAULT 0,
-- 	WINS SMALLINT DEFAULT 0,	
-- 	LOSSES SMALLINT DEFAULT 0,
-- 	DRAWS SMALLINT DEFAULT 0,
-- 	GOALS_SCORED SMALLINT DEFAULT 0,
-- 	RATING AS CAST(POINTS/(MATCHES_PLAYED*3.00);*100.00 AS NUMERIC(5,2))
-- )

-- CREATE TABLE MATCH(
-- 	MATCH_ID INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY,
-- 	PLAYER_NAME VARCHAR(50) NOT NULL,
-- 	TEAM BOOLEAN NOT NULL, --0 - AZUL | 1 - VERMELHO
-- 	GOALS_SCORED SMALLINT DEFAULT 0,
-- 	MATCH_DATE DATE NOT NULL,
-- 	IS_ENDED BOOLEAN DEFAULT 0, --0 - NÃO | 1 - SIM
-- 	FOREIGN KEY (PLAYER_NAME) REFERENCES PLAYER(PLAYER_NAME)
-- );