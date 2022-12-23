import { IMatch } from "../../../types/Match";
import "./MatchDetails.css";
import MatchPlayers from "./MatchPlayers";
import MatchScore from "./MatchScore";

interface MatchDetailsProps {
	match: IMatch;
	refreshPage: () => void;
}

function MatchDetails(props: MatchDetailsProps) {
	const { match, refreshPage } = props;

	const firstTeamPlayers = match.players.filter((player) => player.team === false);
	const firstTeamScore = firstTeamPlayers.reduce((sum, player) => sum + player.goals_scored, 0);

	const secondTeamPlayers = match.players.filter((player) => player.team === true);
	const secondTeamScore = secondTeamPlayers.reduce((sum, player) => sum + player.goals_scored, 0);

	return (
		<div className="details-container">
			<div className="details-score-container">
				<MatchScore
					matchId={match.match_id}
					firstTeamScore={firstTeamScore}
					secondTeamScore={secondTeamScore}
					onAddPlayerSuccess={refreshPage}
				></MatchScore>
			</div>
			<div className="details-goals-container">
				<MatchPlayers match={match} onRemovePlayerSuccess={refreshPage}></MatchPlayers>
			</div>
		</div>
	);
}

export default MatchDetails;
