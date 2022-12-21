import { Button } from "react-bootstrap";
import { userHasAccess } from "../../util/sec";
import "./ReopenMatch.css";

interface ReopenMatchProps {
	reopenMatch: () => void;
}

function ReopenMatch(props: ReopenMatchProps) {
	const { reopenMatch } = props;

	const handleReopenMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja reabrir a partida?");

			if (userConfirmed) {
				reopenMatch();
			}
		}
	};

	return (
		<Button onClick={() => handleReopenMatch()} className={`end-match-button btn-secondary`}>
			<b>Reabrir Partida</b>
		</Button>
	);
}

export default ReopenMatch;
