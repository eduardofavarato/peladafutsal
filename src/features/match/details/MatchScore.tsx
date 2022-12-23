import { Button } from "react-bootstrap";
import MatchService from "../../../services/MatchService";
import { ErrorMessages } from "../../../util/constants";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./MatchScore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isPlayerNameValid } from "../../players/validations";

interface MatchScoreProps {
	matchId: number;
	firstTeamScore: number;
	secondTeamScore: number;
	onAddPlayerSuccess: () => void;
}

function MatchScore(props: MatchScoreProps) {
	const { matchId, firstTeamScore, secondTeamScore, onAddPlayerSuccess } = props;

	const addPlayer = (team: boolean) => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				onAddPlayerSuccess();
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

		MatchService.addPlayer(matchId, { player_name: playerName, team: team }, onSuccess, onError);
	};

	return (
		<div className="score-container">
			<div className="first-team team-title">Time Azul</div>
			<div className="second-team team-title">Time Vermelho</div>
			<div className="first-team team-score">{firstTeamScore}</div>
			<div className="second-team team-score">{secondTeamScore}</div>
			<div className="first-team add-goal">
				<Button variant="dark" onClick={() => addPlayer(false)} className={`add-goal-button`}>
					<FontAwesomeIcon icon={faPlus} /> <b>JOGADOR</b>
				</Button>
			</div>
			<div className="second-team add-goal">
				<Button variant="dark" onClick={() => addPlayer(true)} className={`add-goal-button`}>
					<FontAwesomeIcon icon={faPlus} /> <b>JOGADOR</b>
				</Button>
			</div>
		</div>
	);
}

export default MatchScore;
