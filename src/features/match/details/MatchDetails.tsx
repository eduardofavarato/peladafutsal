import { IMatch } from "../../../types/Match";
import "./MatchDetails.css";
import MatchTeam from "./MatchTeam";

interface MatchDetailsProps {
	match: IMatch;
}

function MatchDetails(props: MatchDetailsProps) {
	const { match } = props;
	const blueTeamPlayers = match.players.filter((player) => player.team === false);
	const redTeamPlayers = match.players.filter((player) => player.team === true);

	return (
		<div className="match-details-container">
			<MatchTeam color="blue" players={blueTeamPlayers}></MatchTeam>
			<MatchTeam color="red" players={redTeamPlayers}></MatchTeam>
		</div>
	);
}

export default MatchDetails;
