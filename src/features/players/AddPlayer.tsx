import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { userHasAccess } from "../../util/sec";
import { isPlayerNameValid } from "./validations";

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
				return alert("Nome inválido");
			}

			addPlayer(playerName);
		}
	};

	return (
		<div className="float-right ml-2 mr-1x pt-1">
			{
				<Button onClick={() => handleAddPlayer()} className="float-right mr-1 px-4 btn-primary">
					<FontAwesomeIcon icon={faUserPlus} />
				</Button>
			}
		</div>
	);
}

export default AddPlayer;
