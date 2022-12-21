import { IMatch } from "../../types/Match";
import "./Match.css";

interface MatchDetailsProps {
	match: IMatch;
}

function MatchDetails(props: MatchDetailsProps) {
	const { match } = props;

	return <div>{match && match.match_date}</div>;
}

export default MatchDetails;
