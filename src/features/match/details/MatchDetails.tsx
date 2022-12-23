import { IMatch } from "../../../types/Match";
import "./MatchDetails.css";
import MatchGoals from "./MatchGoals";
import MatchScore from "./MatchScore";
import MatchTeams from "./MatchTeams";

interface MatchDetailsProps {
	match: IMatch;
	refreshPage: () => void;
}

function MatchDetails(props: MatchDetailsProps) {
	const { match, refreshPage } = props;

	return (
		<div className="details-container">
			<div className="details-score-container">
				<MatchScore match={match}></MatchScore>
			</div>
			<div className="details-title-container">
				<MatchTeams match={match} onEditTeamSuccess={refreshPage}></MatchTeams>
			</div>
			<div className="details-goals-container">
				<MatchGoals match={match}></MatchGoals>
			</div>
		</div>
	);
}

export default MatchDetails;
