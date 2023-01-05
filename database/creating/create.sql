CREATE TABLE player(
	player_name varchar(50) primary key
);

CREATE TABLE match(
	match_id int generated always as identity(start with 1 increment by 1) primary key,
	match_date date not null default DATE(NOW() AT TIME ZONE 'America/Sao_Paulo') unique,
	winner boolean default null, --0 - azul | 1 - vermelho
	is_ended boolean default FALSE --0 - não | 1 - sim
);

CREATE TABLE match_player(
	id int generated always as identity(start with 1 increment by 1) primary key,
   match_id int not null,
   player_name varchar(50) not null,
   team boolean not null, --0 - azul | 1 - vermelho
   goals_scored smallint default 0,
	unique(match_id, player_name)
   foreign key (match_id) references match(match_id),
   foreign key (player_name) references player(player_name)
);	

DROP VIEW IF EXISTS view_standings;
CREATE VIEW view_standings AS 
SELECT
	player_name,
	total_points,
	total_games,
	total_wins, 
	total_losses, 
	total_draws,
	COALESCE(CAST(total_points/(NULLIF(total_games,0)*3.00)*100.00 AS NUMERIC(5,2)), 0.00) AS performance,
	total_goals
FROM (
	SELECT 
		player_name,
		((total_wins * 3) + total_draws ) AS total_points,
		total_games,
		total_wins, 
		total_losses, 
		total_draws,
		total_goals

	FROM (
		SELECT 
			player.player_name,
			COUNT(match.match_id) AS total_games,
			COUNT(match.match_id) FILTER (WHERE winner = team) AS total_wins, 
			COUNT(match.match_id) FILTER (WHERE winner <> team AND winner IS NOT NULL) AS total_losses, 
			COUNT(match.match_id) FILTER (WHERE winner is null) AS total_draws, 
			SUM(COALESCE(goals_scored, 0)) AS total_goals
		FROM match
		INNER JOIN match_player
			ON match.match_id = match_player.match_id
			AND match.is_ended = TRUE
		RIGHT JOIN player
			ON match_player.player_name = player.player_name
		GROUP BY player.player_name
	) sub_2
) sub_1
ORDER BY total_points DESC, total_games DESC, performance DESC, total_wins DESC, total_goals DESC, player_name;