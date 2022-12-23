import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../../util/sec";
import "./CreateMatch.css";
import { ErrorMessages } from "../../../util/constants";
import MatchService from "../../../services/MatchService";

interface CreateMatchProps {
	onCreateSuccess: () => void;
}

function CreateMatch(props: CreateMatchProps) {
	const { onCreateSuccess } = props;

	const createMatch = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onCreateSuccess();
			}
		};

		const onError = (response: any) => {
			if (response.response.status === 400) {
				if (response.response.data.includes("Max of one match per day")) {
					alert(ErrorMessages.MAX_ONE_MATCH_PER_DAY);
				}
			} else {
				alert(ErrorMessages.GENERIC);
			}
		};

		MatchService.create(onSuccess, onError);
	};

	const handleCreateMatch = () => {
		if (userHasAccess()) {
			const userConfirmed = window.confirm("Tem certeza que deseja criar uma nova partida?");

			if (userConfirmed) {
				createMatch();
			}
		}
	};

	return (
		<div className="create-match-container">
			<Button variant="primary" onClick={() => handleCreateMatch()} className={`create-match-button`}>
				<FontAwesomeIcon icon={faPlus} /> <b>Criar Partida</b>
			</Button>
		</div>
	);
}

export default CreateMatch;
