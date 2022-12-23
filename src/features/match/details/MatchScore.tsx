import "./MatchScore.css";

interface MatchScoreProps {
	firstTeamScore: number;
	secondTeamScore: number;
}

function MatchScore(props: MatchScoreProps) {
	const { firstTeamScore, secondTeamScore } = props;

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
