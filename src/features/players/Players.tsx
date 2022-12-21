import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import PlayerService from "../../services/PlayerService";
import PlayerRow from "./PlayerRow";
import AddPlayer from "./AddPlayer";
import { IPlayerData } from "../../types/Players";
import { ErrorMessages } from "../../util/constants";
import Loading from "../loading/Loading";
import "./Player.css";

function Players() {
	const [loading, setLoading] = useState<boolean>(true);
	const [players, setPlayers] = useState<Array<IPlayerData>>([]);

	useEffect(() => {
		PlayerService.getAll((data: any) => {
			setPlayers(data);
			setLoading(false);
		});
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
					alert(ErrorMessages.CANNOT_DELETE_PLAYER_WITH_MATCHES);
				}
			} else {
				alert(ErrorMessages.GENERIC);
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

		const onError = (response: any) => {
			if (response.response.status === 500) {
				if (response.response.data.includes("player_pkey")) {
					alert(ErrorMessages.CANNOT_ADD_PLAYERS_WITH_SAME_NAME);
				}
			} else {
				alert(ErrorMessages.GENERIC);
			}
		};

		PlayerService.create(newPlayer, onSuccess, onError);
	};

	const renderPlayers = () => {
		if (loading) {
			return;
		}

		return (
			<Table className="players-table" size="sm" bordered responsive striped>
				<tbody>{players && players.map((player, index) => <PlayerRow key={index} player={player} removePlayer={removePlayer}></PlayerRow>)}</tbody>
			</Table>
		);
	};

	return (
		<Container fluid>
			<div className="list row">
				<div className="col">
					<div className="title-container my-3 ms-2">
						<div className="title-element">Lista de Jogadores</div>
						<div className="title-element title-button">
							<AddPlayer addPlayer={addPlayer}></AddPlayer>
						</div>
					</div>
					<Loading loading={loading}>{renderPlayers()}</Loading>
				</div>
			</div>
		</Container>
	);
}

export default Players;
