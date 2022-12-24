import "./MatchTeams.css";
import { IMatch, IMatchPlayer } from "../../../../types/Match";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { ErrorMessages } from "../../../../util/constants";
import MatchService from "../../../../services/MatchService";
import MatchPlayer from "./MatchPlayer";
import PlayersListModal from "./PlayersListModal";
import { useState } from "react";

interface MatchTeamsProps {
	match: IMatch;
	onActionSuccess: () => void;
}

const sortByGoalsAndName = (a: IMatchPlayer, b: IMatchPlayer) => {
	if (a.goals_scored > b.goals_scored) return -1;
	else if (a.goals_scored < b.goals_scored) return 1;
	else return a.player_name < b.player_name ? -1 : 1;
};

function MatchTeams(props: MatchTeamsProps) {
	const [showPlayerListFirstTeam, setShowPlayerListFirstTeam] = useState<boolean>(false);
	const [showPlayerListSecondTeam, setShowPlayerListSecondTeam] = useState<boolean>(false);

	const { match, onActionSuccess } = props;

	const firstTeamPlayersSorted = match.players.filter((player) => player.team === false).sort(sortByGoalsAndName);
	const secondTeamPlayersSorted = match.players.filter((player) => player.team === true).sort(sortByGoalsAndName);

	const addPlayer = (playerName: string, team: boolean) => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onActionSuccess();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.addPlayer(match.match_id, { player_name: playerName, team: team }, onSuccess, onError);
	};

	const addPlayerToFirstTeam = (playerName: string) => {
		addPlayer(playerName, false);
		setShowPlayerListFirstTeam(false);
	};

	const addPlayerToSecondTeam = (playerName: string) => {
		addPlayer(playerName, true);
		setShowPlayerListSecondTeam(false);
	};

	return (
		<div className="teams-container">
			<div className="teams-title">Times</div>
			<div className="teams-players-container">
				{firstTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container ">
						{firstTeamPlayersSorted.map((player, index) => (
							<MatchPlayer key={player.player_name} match={match} player={player} onActionSuccess={onActionSuccess}></MatchPlayer>
						))}
						{!match.is_ended && (
							<div className="teams-add-player-container">
								<Button variant="light" onClick={() => setShowPlayerListFirstTeam(true)} className={`teams-add-player-button`}>
									<div className="team-add-player-icon">
										<FontAwesomeIcon icon={faPlus} /> Jogador
									</div>
								</Button>
							</div>
						)}
					</div>
				)}
				{secondTeamPlayersSorted.length > 0 && (
					<div className="teams-team-container">
						{secondTeamPlayersSorted.map((player, index) => (
							<MatchPlayer key={player.player_name} match={match} player={player} onActionSuccess={onActionSuccess}></MatchPlayer>
						))}
						{!match.is_ended && (
							<div className="teams-add-player-container">
								<Button variant="light" onClick={() => setShowPlayerListSecondTeam(true)} className={`teams-add-player-button`}>
									<div className="team-add-player-icon">
										<FontAwesomeIcon icon={faPlus} /> Jogador
									</div>
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
			{showPlayerListFirstTeam && (
				<PlayersListModal
					matchId={match.match_id}
					onClose={() => setShowPlayerListFirstTeam(false)}
					onSelect={addPlayerToFirstTeam}
				></PlayersListModal>
			)}
			{showPlayerListSecondTeam && (
				<PlayersListModal
					matchId={match.match_id}
					onClose={() => setShowPlayerListSecondTeam(false)}
					onSelect={addPlayerToSecondTeam}
				></PlayersListModal>
			)}
		</div>
	);
}

export default MatchTeams;
