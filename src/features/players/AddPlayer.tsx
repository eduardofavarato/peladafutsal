import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../util/sec";
import { isPlayerNameValid } from "./validations";
import "./AddPlayer.css";
import { ErrorMessages } from "../../util/constants";

interface AddPlayerProps {
	addPlayer: (playerName: string) => void;
}

function AddPlayer(props: AddPlayerProps) {
	const { addPlayer } = props;

	const handleAddPlayer = () => {
		if (userHasAccess()) {
			const playerName = prompt("Nome:");

			if (playerName === null) {
				return;
			}

			if (!isPlayerNameValid(playerName)) {
				return alert(ErrorMessages.INVALID_NAME);
			}

			addPlayer(playerName);
		}
	};

	return (
		<Button variant="primary" onClick={() => handleAddPlayer()} className="add-player-button">
			<FontAwesomeIcon icon={faUserPlus} />
		</Button>
	);
}

export default AddPlayer;
