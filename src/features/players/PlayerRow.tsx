import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./PlayerRow.css";
import { userHasAccess } from "../../util/sec";
import { IPlayerData } from "../../types/Players";

interface PlayerRowProps {
	player: IPlayerData;
	removePlayer: (playerName: string) => void;
}

function PlayerRow(props: PlayerRowProps) {
	const playerName = props.player.player_name;
	const { removePlayer } = props;

	const handleRemovePlayer = (playerName: string) => {
		if (userHasAccess()) {
			removePlayer(playerName);
		}
	};

	return (
		<tr className="player-row ms-2 me-1x">
			<td className="player-name-column">{playerName}</td>
			<td className="remove-button-column">
				<Button onClick={() => handleRemovePlayer(playerName)} className="float-end btn-danger remove-button">
					<FontAwesomeIcon icon={faTrashCan} />
				</Button>
			</td>
		</tr>
	);
}

export default PlayerRow;
