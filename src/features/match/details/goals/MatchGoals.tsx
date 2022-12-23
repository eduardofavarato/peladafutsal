import "./MatchGoals.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MatchGoalsProps {
	match: IMatch;
}

const sortByGoalsTeamAndName = (a: IMatchPlayer, b: IMatchPlayer) => {
	if (a.goals_scored > b.goals_scored) return -1;
	else if (a.goals_scored > b.goals_scored) return 1;
	else if (a.team > b.team) return -1;
	else if (a.team > b.team) return 1;
	else return a.player_name < b.player_name ? -1 : 1;
};

const getTeam = (player: IMatchPlayer) => {
	return player.team ? "second" : "first";
};

function MatchGoals(props: MatchGoalsProps) {
	const { match } = props;

	const sortedScoringPlayers = match.players
		.filter((player) => !!player.player_name)
		.filter((player) => player.goals_scored > 0)
		.sort(sortByGoalsTeamAndName);

	return (
		<div className="players-container">
			<div className="players-title">Gols</div>
			<div className="players">
				{sortedScoringPlayers &&
					sortedScoringPlayers.map((player, index) => (
						<div key={index} className={`player ${getTeam(player)}-team`}>
							<div className="player-name">{player.player_name}</div>
							<div className="player-goals">{Array(player.goals_scored).fill(<FontAwesomeIcon icon={faFutbol} />)}</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default MatchGoals;
