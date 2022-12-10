import { Button } from "react-bootstrap";
import IPlayerData from "../../types/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface PlayerRowProps {
	player: IPlayerData;
	removePlayer: (playerName: string) => void;
}

function PlayerRow(props: PlayerRowProps) {
	const playerName = props.player.player_name;
	const { removePlayer } = props;

	return (
		<div>
			{playerName}
			{
				<Button onClick={() => removePlayer(playerName)} className="float-right btn-danger">
					<FontAwesomeIcon icon={faTrashCan} />
				</Button>
			}
		</div>
	);
}

export default PlayerRow;
