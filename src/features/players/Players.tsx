import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import PlayerService from "../../services/PlayerService";
import IPlayerData from "../../types/Player";
import PlayerRow from "./PlayerRow";
import AddPlayer from "./AddPlayer";

function Players() {
	const [players, setPlayers] = useState<Array<IPlayerData>>([]);

	useEffect(() => {
		PlayerService.getAll(setPlayers);
	}, []);

	const removePlayer = (playerName: string) => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				setPlayers((players) => players.filter((player) => player.player_name !== playerName));
			}
		};

		PlayerService.remove(playerName, onSuccess);
	};

	const addPlayer = (newPlayerName: string) => {
		const newPlayer: IPlayerData = {
			player_name: newPlayerName.toUpperCase(),
		};

		const onSuccess = (response: any) => {
			if (response.status === 200) {
				setPlayers((players) => [newPlayer, ...players]);
			}
		};

		PlayerService.create(newPlayer, onSuccess);
	};

	return (
		<div className="list row">
			<div className="col-lg-6">
				<h2 className="my-4 ml-2">
					Lista de Jogadores
					<AddPlayer addPlayer={addPlayer}></AddPlayer>
				</h2>
				<ListGroup>
					{players &&
						players.map((player, index) => (
							<ListGroup.Item key={index} className="p-1">
								<PlayerRow player={player} removePlayer={removePlayer}></PlayerRow>
							</ListGroup.Item>
						))}
				</ListGroup>
			</div>
		</div>
	);
}

export default Players;
