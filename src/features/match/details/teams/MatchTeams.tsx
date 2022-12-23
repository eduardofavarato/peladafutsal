import "./MatchTeams.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { ErrorMessages } from "../../../../util/constants";
import { userHasAccess } from "../../../../util/sec";
import MatchService from "../../../../services/MatchService";
import { isPlayerNameValid } from "../../../players/validations";
import { useState } from "react";

interface MatchTeamsProps {
	match: IMatch;
	onEditTeamSuccess: () => void;
}

function MatchTeams(props: MatchTeamsProps) {
	const [showDelete, setShowDelete] = useState<boolean>(false);
	const { match, onEditTeamSuccess } = props;

	const firstTeamPlayersSorted = match.players
		.filter((player) => player.team === false)
		.sort((a: IMatchPlayer, b: IMatchPlayer) => (a.player_name < b.player_name ? -1 : 1));

	const secondTeamPlayersSorted = match.players
		.filter((player) => player.team === true)
		.sort((a: IMatchPlayer, b: IMatchPlayer) => (a.player_name < b.player_name ? -1 : 1));

	const addPlayer = (team: boolean) => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onEditTeamSuccess();
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

	const removePlayer = (playerName: string) => {
		if (userHasAccess()) {
			const onSuccess = (response: any) => {
				if (response.status === 200) {
					setShowDelete(false);
					onEditTeamSuccess();
				}
			};

			const onError = (response: any) => {
				alert(ErrorMessages.GENERIC);
			};

			MatchService.removePlayer(match.match_id, { player_name: playerName }, onSuccess, onError);
		}
	};

	return (
		<div className="teams-container">
			<div className="teams-title">Times</div>
			<div className="teams-add-player-container">
				<Button variant="light" onClick={() => addPlayer(false)} className={`teams-add-player-button`}>
					<div className="team-add-player-icon">
						<FontAwesomeIcon icon={faPlus} /> Jogador
					</div>
				</Button>
				<Button variant="light" onClick={() => addPlayer(true)} className={`teams-add-player-button`}>
					<div className="team-add-player-icon">
						<FontAwesomeIcon icon={faPlus} /> Jogador
					</div>
				</Button>
			</div>
			<div className="teams-players-container">
				{firstTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container ">
						{firstTeamPlayersSorted.map((player, index) => (
							<div key={index} className="team-player-container teams-first-team">
								{!showDelete && <div className="red-sign" onClick={() => setShowDelete(true)}></div>}
								{showDelete && (
									<div className="team-remove-player">
										<Button
											variant="danger"
											onClick={() => removePlayer(player.player_name)}
											className={`teams-remove-player-button`}
										>
											<div className="team-remove-player-icon">
												<FontAwesomeIcon icon={faTrash} />
											</div>
										</Button>
									</div>
								)}
								<div className="team-player-name" onClick={() => setShowDelete(!showDelete)}>
									{player.player_name}
								</div>
							</div>
						))}
					</div>
				)}
				{secondTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container">
						{secondTeamPlayersSorted.map((player, index) => (
							<div key={index} className="team-player-container teams-second-team">
								{!showDelete && <div onClick={() => setShowDelete(true)} className="red-sign"></div>}
								{showDelete && (
									<div className="team-remove-player">
										<Button
											variant="danger"
											onClick={() => removePlayer(player.player_name)}
											className={`teams-remove-player-button`}
										>
											<div className="team-remove-player-icon">
												<FontAwesomeIcon icon={faTrash} />
											</div>
										</Button>
									</div>
								)}
								<div className="team-player-name" onClick={() => setShowDelete(!showDelete)}>
									{player.player_name}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default MatchTeams;
