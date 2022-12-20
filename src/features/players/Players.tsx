import { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import PlayerService from "../../services/PlayerService";
import PlayerRow from "./PlayerRow";
import AddPlayer from "./AddPlayer";
import { IPlayerData } from "../../types/Players";

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
		const onError = (response: any) => {
			if (response.response.status === 500) {
				if (response.response.data.includes("match_player_player_name_fkey")) {
					alert("Não é possível excluir um jogador que já jogou partidas.");
				}
			}
		};

		PlayerService.remove(playerName, onSuccess, onError);
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
		<Container fluid>
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
		</Container>
	);
}

export default Players;
