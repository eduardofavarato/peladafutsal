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
		<div className="player-row ml-2 mr-1x">
			{playerName}
			{
				<Button onClick={() => handleRemovePlayer(playerName)} className="float-right btn-danger">
					<FontAwesomeIcon icon={faTrashCan} />
				</Button>
			}
		</div>
	);
}

export default PlayerRow;
