import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import PlayerService from "../../services/PlayerService";
import IPlayerData from "../../types/Player";
import PlayerRow from "./PlayerRow";

function Players() {
	const [players, setPlayers] = useState<Array<IPlayerData>>([]);

	useEffect(() => {
		retrievePlayers();
	}, [players]);

	const retrievePlayers = () => {
		PlayerService.getAll()
			.then((response: any) => {
				setPlayers(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	const removePlayer = (playerName: string) => {
		PlayerService.remove(playerName)
			.then((response: any) => {
				console.log(response.data);
				if (response.statusCode === 200) {
					setPlayers((current) => current.filter((player) => player.player_name !== playerName));
				}
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	return (
		<div className="list row">
			<div className="col-md-6">
				<h4>Lista de Jogadores</h4>
				<ListGroup>
					{players &&
						players.map((player, index) => (
							<ListGroup.Item key={index}>
								<PlayerRow player={player} removePlayer={removePlayer}></PlayerRow>
							</ListGroup.Item>
						))}
				</ListGroup>
			</div>
		</div>
	);
}

export default Players;
