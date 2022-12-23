import { IMatchPlayer } from "../../../types/Match";
import { Labels } from "../../../util/constants";
import "./MatchTeam.css";

interface MatchTeamProps {
	color: string;
	players: Array<IMatchPlayer>;
}

function MatchTeam(props: MatchTeamProps) {
	const { color, players } = props;

	const teamName = color === "blue" ? Labels.TEAM_BLUE : Labels.TEAM_RED;

	return (
		<div className={`match-team-container match-team-container-${color}`}>
			<div className="match-team-name">{teamName}</div>
			<div>
				{players.map((player, index) => (
					<div>{`${player.player_name}: ${player.goals_scored} gol(s)`}</div>
				))}
			</div>
		</div>
	);
}

export default MatchTeam;
