SET TIMEZONE TO 'America/Sao_Paulo';

CREATE TABLE player(
	player_name varchar(50) primary key
);

CREATE TABLE match(
	match_id int generated always as identity(start with 1 increment by 1) primary key,
	match_date date not null default NOW() unique,
	winner boolean default null, --0 - azul | 1 - vermelho
	is_ended boolean default FALSE --0 - não | 1 - sim
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