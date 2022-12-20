import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../util/sec";

interface CreateMatchProps {
	createMatch: () => void;
	invisible?: boolean;
}

function CreateMatch(props: CreateMatchProps) {
	const { createMatch, invisible } = props;

	const handleCreateMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja criar uma nova partida?");

			if (userConfirmed) {
				createMatch();
			}
		}
	};

	return (
		<div className="pt-1">
			{
				<Button onClick={() => handleCreateMatch()} className={`px-2 btn-primary ${invisible ? "d-none" : ""}`}>
					<FontAwesomeIcon icon={faPlus} /> <b>Criar Partida</b>
				</Button>
			}
		</div>
	);
}

export default CreateMatch;
