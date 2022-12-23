import { IMatch } from "../../../types/Match";
import "./MatchDetails.css";
import MatchPlayers from "./MatchPlayers";
import MatchScore from "./MatchScore";
import MatchTeams from "./MatchTeams";

interface MatchDetailsProps {
	match: IMatch;
	refreshPage: () => void;
}

function MatchDetails(props: MatchDetailsProps) {
	const { match, refreshPage } = props;

	const firstTeamScore = match.players.filter((player) => player.team === false).reduce((sum, player) => sum + player.goals_scored, 0);
	const secondTeamScore = match.players.filter((player) => player.team === true).reduce((sum, player) => sum + player.goals_scored, 0);

	return (
		<div className="details-container">
			<div className="details-score-container">
				<MatchScore firstTeamScore={firstTeamScore} secondTeamScore={secondTeamScore}></MatchScore>
			</div>
			<div className="details-title-container">
				<MatchTeams match={match} onEditTeamSuccess={refreshPage}></MatchTeams>
			</div>
			<div className="details-goals-container">
				<MatchPlayers match={match}></MatchPlayers>
			</div>
		</div>
	);
}

export default MatchDetails;
