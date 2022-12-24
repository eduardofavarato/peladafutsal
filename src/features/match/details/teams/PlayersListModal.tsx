import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import MatchService from "../../../../services/MatchService";
import { IPlayerData } from "../../../../types/Players";
import "./PlayersListModal.css";

interface PlayersListModalProps {
	matchId: number;
	onClose: () => void;
	onSelect: (playerName: string) => void;
}

function PlayersListModal(props: PlayersListModalProps) {
	const [availablePlayers, setAvailablePlayers] = useState<Array<IPlayerData>>([]);

	const { matchId, onSelect, onClose } = props;

	useEffect(() => {
		MatchService.getAvailablePlayers(matchId, setAvailablePlayers);
	}, [matchId]);

	return (
		<div className={`players-list-modal-container`}>
			<div className={`players-list-title`}>Escolha o jogador:</div>
			<div className={`players-list-container`}>
				{availablePlayers.map((player, index) => (
					<Button key={index} variant="warning" onClick={() => onSelect(player.player_name)} className={`players-list-player-button`}>
						<div className="players-list-player-name">{player.player_name}</div>
					</Button>
				))}
			</div>
			<div className={`players-list-cancel`}>
				<Button variant="danger" onClick={() => onClose()} className={`players-list-cancel-button`}>
					<b>Cancelar</b>
				</Button>
			</div>
		</div>
	);
}

export default PlayersListModal;
