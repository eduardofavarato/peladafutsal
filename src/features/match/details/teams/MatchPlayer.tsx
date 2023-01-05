import "./MatchPlayer.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faFutbol, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessages } from "../../../../util/constants";
import { userHasAccess } from "../../../../util/sec";
import MatchService from "../../../../services/MatchService";
import { useState } from "react";
import PlayerActionsModal from "./PlayerActionsModal";
import tangerine from "../../../../assets/images/tangerine.png";

interface MatchPlayerProps {
	match: IMatch;
	player: IMatchPlayer;
	onActionSuccess: () => void;
}

const getTeam = (player: IMatchPlayer) => {
	return player.team ? "second" : "first";
};

function MatchPlayer(props: MatchPlayerProps) {
	const [showPlayerActions, setShowPlayerActions] = useState<boolean>(false);
	const { match, player, onActionSuccess } = props;

	const removePlayer = () => {
		if (userHasAccess()) {
			const onSuccess = (response: any) => {
				if (response.status === 200) {
					setShowPlayerActions(false);
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
				setShowPlayerActions(false);
				onActionSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.addGoal(match.match_id, { player_name: player.player_name }, onSuccess, onError);
	};

	const removeGoal = () => {
		if (userHasAccess()) {
			const onSuccess = (response: any) => {
				if (response.status === 200) {
					setShowPlayerActions(false);
					onActionSuccess();
				}
			};

			const onError = (response: any) => {
				alert(ErrorMessages.GENERIC);
			};

			MatchService.removeGoal(match.match_id, { player_name: player.player_name }, onSuccess, onError);
		}
	};

	const renderGoal = (index: number) => {
		if (player.player_name.toUpperCase() === "YURI") {
			return <img src={tangerine} width="30" height="30" className="img-fluid d-inline-block align-center rounded-circle" alt=""></img>;
		}

		return <FontAwesomeIcon key={index} icon={faFutbol} />;
	};

	return (
		<div>
			<button
				disabled={match.is_ended}
				onClick={() => setShowPlayerActions(true)}
				className={`team-player-container team-player-button teams-${getTeam(player)}-team disabled-${match.is_ended}`}
			>
				<div className="team-player-name">{player.player_name}</div>
				<div className="team-player-goals">
					{player.goals_scored === 0 && !match.is_ended ? (
						<FontAwesomeIcon icon={faPlus} />
					) : (
						[...Array(player.goals_scored)].map((e, i) => renderGoal(i))
					)}
				</div>
			</button>
			{showPlayerActions && (
				<PlayerActionsModal
					onClose={() => setShowPlayerActions(false)}
					onAddGoal={() => addGoal()}
					onRemoveGoal={() => removeGoal()}
					onRemovePlayer={() => removePlayer()}
				></PlayerActionsModal>
			)}
		</div>
	);
}

export default MatchPlayer;
