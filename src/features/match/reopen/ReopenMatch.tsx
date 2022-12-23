import { Button } from "react-bootstrap";
import MatchService from "../../../services/MatchService";
import { ErrorMessages } from "../../../util/constants";
import { userHasAccess } from "../../../util/sec";
import "./ReopenMatch.css";

interface ReopenMatchProps {
	matchId: number;
	onReopenMatchSuccess: () => void;
}

function ReopenMatch(props: ReopenMatchProps) {
	const { matchId, onReopenMatchSuccess } = props;

	const reopenMatch = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onReopenMatchSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.reopen(matchId, onSuccess, onError);
	};

	const handleReopenMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja reabrir a partida?");

			if (userConfirmed) {
				reopenMatch();
			}
		}
	};

	return (
		<div className="reopen-match-container">
			<Button variant="warning" onClick={() => handleReopenMatch()} className={`reopen-match-button`}>
				<b>Reabrir Partida</b>
			</Button>
		</div>
	);
}

export default ReopenMatch;
