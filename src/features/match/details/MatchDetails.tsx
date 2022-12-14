import { IMatch } from "../../../types/Match";
import "./MatchDetails.css";
import MatchScore from "./score/MatchScore";
import MatchTeams from "./teams/MatchTeams";

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
			<div className="details-teams-container">
				<MatchTeams match={match} onActionSuccess={refreshPage}></MatchTeams>
			</div>
		</div>
	);
}

export default MatchDetails;
