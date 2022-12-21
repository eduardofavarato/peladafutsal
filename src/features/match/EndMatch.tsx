import { Button } from "react-bootstrap";
import { userHasAccess } from "../../util/sec";
import "./EndMatch.css";

interface EndMatchProps {
	endMatch: () => void;
}

function EndMatch(props: EndMatchProps) {
	const { endMatch } = props;

	const handleEndMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja encerrar a partida?");

			if (userConfirmed) {
				endMatch();
			}
		}
	};

	return (
		<Button onClick={() => handleEndMatch()} className={`end-match-button btn-danger`}>
			<b>Encerrar Partida</b>
		</Button>
	);
}

export default EndMatch;
