export interface IMatchPlayer {
	player_name: string;
	team: boolean;
	goals_scored: number;
}

export interface IMatch {
	match_id: number;
	match_date: string;
	is_ended: boolean;
	winner: boolean;
	players: Array<IMatchPlayer>;
}

export interface IAddMatchPlayer {
	player_name: string;
	team: boolean;
}

export interface IMatchGoal {
	player_name: string;
}
