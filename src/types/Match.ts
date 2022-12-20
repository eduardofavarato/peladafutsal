export interface IMatchPlayer {
	player_name: string;
	team: boolean;
	goals_scored: number;
}

export interface IMatch {
	match_id: number;
	match_date: string;
	winner: boolean;
	is_ended: boolean;
	players: Array<IMatchPlayer>;
}

export interface IAddMatchPlayer {
	player_name: string;
	team: boolean;
}

export interface IMatchGoal {
	player_name: string;
}

export interface IMatchEnd {
	winner: boolean;
}
