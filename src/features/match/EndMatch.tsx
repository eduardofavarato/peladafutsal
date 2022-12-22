import { Button } from "react-bootstrap";
import MatchService from "../../services/MatchService";
import { ErrorMessages } from "../../util/constants";
import { userHasAccess } from "../../util/sec";
import "./EndMatch.css";

interface EndMatchProps {
	matchId: number;
	onEndMatchSuccess: () => void;
}

function EndMatch(props: EndMatchProps) {
	const { matchId, onEndMatchSuccess } = props;

	const endMatch = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onEndMatchSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.end(matchId, onSuccess, onError);
	};

	const handleEndMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja encerrar a partida?");

			if (userConfirmed) {
				endMatch();
			}
		}
	};

	return (
		<Button variant="danger" onClick={() => handleEndMatch()} className={`end-match-button`}>
			<b>Encerrar Partida</b>
		</Button>
	);
}

export default EndMatch;
