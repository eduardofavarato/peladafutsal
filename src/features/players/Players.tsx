import React, { useState, useEffect } from "react";
import PlayerService from "../../services/PlayerService";
import IPlayerData from "../../types/Player";

const Players: React.FC = () => {
	const [players, setPlayers] = useState<Array<IPlayerData>>([]);

	useEffect(() => {
		retrievePlayers();
	}, []);

	const retrievePlayers = () => {
		PlayerService.getAll()
			.then((response: any) => {
				setPlayers(response.data);
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	return (
		<div className="list row">
			<div className="col-md-6">
				<h4>Lista de Jogadores</h4>

				<ul className="list-group">
					{players &&
						players.map((player, index) => (
							<li className={"list-group-item"} key={index}>
								{player.player_name}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default Players;
