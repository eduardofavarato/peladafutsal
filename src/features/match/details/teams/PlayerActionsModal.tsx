import { Button } from "react-bootstrap";
import "./PlayerActionsModal.css";

interface PlayerActionsModalProps {
	onClose: () => void;
	onAddGoal: () => void;
	onRemoveGoal: () => void;
	onRemovePlayer: () => void;
}

function PlayerActionsModal(props: PlayerActionsModalProps) {
	const { onClose, onAddGoal, onRemoveGoal, onRemovePlayer } = props;

	return (
		<div className={`players-actions-modal-container`}>
			<div className={`players-actions-title`}>Escolha uma opção:</div>
			<div className={`players-actions-container`}>
				<Button variant="primary" onClick={onAddGoal} className={`players-actions-add-goal-button`}>
					<div className="players-add-goal-text">Adicionar Gol</div>
				</Button>
				<Button variant="warning" onClick={onRemoveGoal} className={`players-actions-remove-goal-button`}>
					<div className="players-actions-text">Remover gol</div>
				</Button>
				<Button variant="warning" onClick={onRemovePlayer} className={`players-actions-remove-player-button`}>
					<div className="players-actions-text">Remover jogador</div>
				</Button>
			</div>
			<div className={`players-actions-cancel`}>
				<Button variant="danger" onClick={() => onClose()} className={`players-actions-cancel-button`}>
					<b>Cancelar</b>
				</Button>
			</div>
		</div>
	);
}

export default PlayerActionsModal;
