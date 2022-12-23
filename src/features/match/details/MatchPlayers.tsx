import "./MatchPlayers.css";
import { IMatch, IMatchPlayer } from "../../../types/Match";
import { faFutbol, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import MatchService from "../../../services/MatchService";
import { ErrorMessages } from "../../../util/constants";
import { userHasAccess } from "../../../util/sec";

interface MatchPlayersProps {
	match: IMatch;
	onRemovePlayerSuccess: () => void;
}

function MatchPlayers(props: MatchPlayersProps) {
	const { match, onRemovePlayerSuccess } = props;

	const sortedPlayers = match.players.sort((a: IMatchPlayer, b: IMatchPlayer) => {
		if (a.goals_scored > b.goals_scored) return -1;
		else if (a.goals_scored > b.goals_scored) return 1;
		else {
			if (a.team > b.team) return -1;
			else if (a.team > b.team) return 1;
			else {
				return a.player_name < b.player_name ? -1 : 1;
			}
		}
	});

	const getTeam = (player: IMatchPlayer) => {
		return player.team ? "second" : "first";
	};

	const removePlayer = (matchId: number, playerName: string) => {
		if (userHasAccess()) {
			const onSuccess = (response: any) => {
				if (response.status === 200) {
					onRemovePlayerSuccess();
				}
			};

			const onError = (response: any) => {
				alert(ErrorMessages.GENERIC);
			};

			MatchService.removePlayer(matchId, { player_name: playerName }, onSuccess, onError);
		}
	};

	return (
		<div className="players-container">
			<div className="players-title">Jogadores</div>
			<div className="players">
				{sortedPlayers &&
					sortedPlayers.map((player, index) => (
						<div className={`player ${getTeam(player)}-team`}>
							<div className="remove-player">
								<Button
									variant="dark"
									onClick={() => removePlayer(match.match_id, player.player_name)}
									className={`remove-player-button`}
								>
									<FontAwesomeIcon icon={faUserMinus} />
								</Button>
							</div>
							<div className="player-name">{player.player_name}</div>
							<div className="player-goals">{Array(player.goals_scored).fill(<FontAwesomeIcon icon={faFutbol} />)}</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default MatchPlayers;
