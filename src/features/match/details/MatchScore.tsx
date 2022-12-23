import { IMatch } from "../../../types/Match";
import "./MatchScore.css";

interface MatchScoreProps {
	match: IMatch;
}

function MatchScore(props: MatchScoreProps) {
	const { match } = props;

	const firstTeamScore = match.players.filter((player) => player.team === false).reduce((sum, player) => sum + player.goals_scored, 0);
	const secondTeamScore = match.players.filter((player) => player.team === true).reduce((sum, player) => sum + player.goals_scored, 0);

	return (
		<div className="score-container">
			<div className="score-title">Placar</div>
			<div className="score-teams-score-container">
				<div className="score-first-team team-score">{firstTeamScore}</div>
				<div className="score-second-team team-score">{secondTeamScore}</div>
			</div>
		</div>
	);
}

export default MatchScore;
