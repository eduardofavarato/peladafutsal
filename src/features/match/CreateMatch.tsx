import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../util/sec";

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
		<div className="text-center mt-5">
			{
				<Button onClick={() => handleCreateMatch()} className={`px-2 w-100 btn-primary`}>
					<FontAwesomeIcon icon={faPlus} /> <b>Criar Partida</b>
				</Button>
			}
		</div>
	);
}

export default CreateMatch;
