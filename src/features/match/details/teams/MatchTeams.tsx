import "./MatchTeams.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { ErrorMessages } from "../../../../util/constants";
import MatchService from "../../../../services/MatchService";
import { isPlayerNameValid } from "../../../players/validations";
import MatchPlayer from "./MatchPlayer";

interface MatchTeamsProps {
	match: IMatch;
	onActionSuccess: () => void;
}

function MatchTeams(props: MatchTeamsProps) {
	const { match, onActionSuccess } = props;

	const firstTeamPlayersSorted = match.players
		.filter((player) => player.team === false)
		.sort((a: IMatchPlayer, b: IMatchPlayer) => (a.player_name < b.player_name ? -1 : 1));

	const secondTeamPlayersSorted = match.players
		.filter((player) => player.team === true)
		.sort((a: IMatchPlayer, b: IMatchPlayer) => (a.player_name < b.player_name ? -1 : 1));

	const addPlayer = (team: boolean) => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onActionSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		const playerName = prompt("Nome:");

		if (playerName === null) {
			return;
		}

		if (!isPlayerNameValid(playerName)) {
			return alert(ErrorMessages.INVALID_NAME);
		}

		MatchService.addPlayer(match.match_id, { player_name: playerName, team: team }, onSuccess, onError);
	};

	return (
		<div className="teams-container">
			<div className="teams-title">Times</div>
			<div className="teams-players-container">
				{firstTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container ">
						{firstTeamPlayersSorted.map((player, index) => (
							<MatchPlayer key={index} match={match} player={player} onActionSuccess={onActionSuccess}></MatchPlayer>
						))}
						<div className="teams-add-player-container">
							<Button variant="light" onClick={() => addPlayer(false)} className={`teams-add-player-button`}>
								<div className="team-add-player-icon">
									<FontAwesomeIcon icon={faPlus} /> Jogador
								</div>
							</Button>
						</div>
					</div>
				)}
				{secondTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container">
						{secondTeamPlayersSorted.map((player, index) => (
							<MatchPlayer key={index} match={match} player={player} onActionSuccess={onActionSuccess}></MatchPlayer>
						))}
						<div className="teams-add-player-container">
							<Button variant="light" onClick={() => addPlayer(true)} className={`teams-add-player-button`}>
								<div className="team-add-player-icon">
									<FontAwesomeIcon icon={faPlus} /> Jogador
								</div>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MatchTeams;
