import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../util/sec";
import "./CreateMatch.css";

interface CreateMatchProps {
	createMatch: () => void;
}

function CreateMatch(props: CreateMatchProps) {
	const { createMatch } = props;

	const handleCreateMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja criar uma nova partida?");

			if (userConfirmed) {
				createMatch();
			}
		}
	};

	return (
		<Button onClick={() => handleCreateMatch()} className={`create-match-button btn-primary`}>
			<FontAwesomeIcon icon={faPlus} /> <b>Criar Partida</b>
		</Button>
	);
}

export default CreateMatch;
