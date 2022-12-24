import "./MatchPlayer.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faFutbol, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessages } from "../../../../util/constants";
import { userHasAccess } from "../../../../util/sec";
import MatchService from "../../../../services/MatchService";

interface MatchPlayerProps {
	match: IMatch;
	player: IMatchPlayer;
	onActionSuccess: () => void;
}

const getTeam = (player: IMatchPlayer) => {
	return player.team ? "second" : "first";
};

function MatchPlayer(props: MatchPlayerProps) {
	const { match, player, onActionSuccess } = props;

	const removePlayer = () => {
		if (userHasAccess()) {
			const onSuccess = (response: any) => {
				if (response.status === 200) {
					onActionSuccess();
				}
			};

			const onError = (response: any) => {
				alert(ErrorMessages.GENERIC);
			};

			MatchService.removePlayer(match.match_id, { player_name: player.player_name }, onSuccess, onError);
		}
	};

	const addGoal = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onActionSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.addGoal(match.match_id, { player_name: player.player_name }, onSuccess, onError);
	};

	const removeGoal = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onActionSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.removeGoal(match.match_id, { player_name: player.player_name }, onSuccess, onError);
	};

	const handlePlayerAction = () => {
		const action = prompt("O que deseja fazer? 1 (+ 1 gol), 2(- 1 gol), 3 (remover jogador)");

		const actionNumber = Number(action);

		if (actionNumber === null || isNaN(actionNumber) || actionNumber < 1 || actionNumber > 3) {
			alert("Opção inválida");
		} else {
			switch (actionNumber) {
				case 1:
					addGoal();
					break;
				case 2:
					removeGoal();
					break;
				default:
					removePlayer();
					break;
			}
		}
	};

	return (
		<button
			disabled={match.is_ended}
			onClick={() => handlePlayerAction()}
			className={`team-player-container team-player-button teams-${getTeam(player)}-team disabled-${match.is_ended}`}
		>
			<div className="team-player-name">{player.player_name}</div>
			<div className="team-player-goals">
				{player.goals_scored === 0 && !match.is_ended ? (
					<FontAwesomeIcon icon={faPlus} />
				) : (
					[...Array(player.goals_scored)].map((e, i) => <FontAwesomeIcon key={i} icon={faFutbol} />)
				)}
			</div>
		</button>
	);
}

export default MatchPlayer;
