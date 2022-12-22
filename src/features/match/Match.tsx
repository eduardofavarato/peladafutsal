import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MatchService from "../../services/MatchService";
import { IMatch } from "../../types/Match";
import CreateMatch from "./CreateMatch";
import "./Match.css";
import { ErrorMessages } from "../../util/constants";
import MatchDetails from "./MatchDetails";
import Loading from "../loading/Loading";
import { extractDateFromMatch } from "../../util/dates";
import ErrorAlert from "../error-alert/ErrorAlert";
import EndMatch from "./EndMatch";
import ReopenMatch from "./ReopenMatch";

function Match() {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [match, setMatch] = useState<IMatch>();

	const matchDate = extractDateFromMatch(match);

	const fetchTodaysMatch = () => {
		const handleError = (error: any) => {
			if (error && error.response && error.response.status === 404) return;
			setError(true);
		};

		MatchService.getTodaysMatch(setMatch, handleError, () => setLoading(false));
	};

	useEffect(() => {
		fetchTodaysMatch();
	}, []);

	const createMatch = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				fetchTodaysMatch();
			}
		};

		const onError = (response: any) => {
			if (response.response.status === 400) {
				if (response.response.data.includes("Max of one match per day")) {
					alert(ErrorMessages.MAX_ONE_MATCH_PER_DAY);
				}
			} else {
				alert(ErrorMessages.GENERIC);
			}
		};

		MatchService.create(onSuccess, onError);
	};

	const endMatch = () => {
		if (!match) return;

		const onSuccess = (response: any) => {
			if (response.status === 200) {
				fetchTodaysMatch();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.end(match.match_id, onSuccess, onError);
	};

	const reopenMatch = () => {
		if (!match) return;

		const onSuccess = (response: any) => {
			if (response.status === 200) {
				fetchTodaysMatch();
			}
		};

		const onError = (response: any) => {
			alert(ErrorMessages.GENERIC);
		};

		MatchService.reopen(match.match_id, onSuccess, onError);
	};

	const Error = () => {
		return error && <ErrorAlert dismiss={() => setError(false)}></ErrorAlert>;
	};

	const Title = () => {
		return (
			<div className="title-container my-2 ms-2">
				<div className="title-element">{`Partida: ${matchDate ? matchDate.formattedDate() : ""}`}</div>
				{!match && (
					<div className="title-element title-button">
						<CreateMatch createMatch={createMatch}></CreateMatch>
					</div>
				)}
				{isMatchEnded() && <div className="title-element title-ended">Encerrada</div>}
			</div>
		);
	};

	const renderMatchDetails = () => {
		if (loading) {
			return;
		}

		if (match === undefined) {
			return;
		}

		return <MatchDetails match={match}></MatchDetails>;
	};

	const renderEndMatch = () => {
		return (
			match && (
				<div className="text-center">
					<EndMatch endMatch={endMatch}></EndMatch>
				</div>
			)
		);
	};

	const renderReopenMatch = () => {
		return (
			<div className="text-center">
				<ReopenMatch reopenMatch={reopenMatch}></ReopenMatch>
			</div>
		);
	};

	const isMatchEnded = () => {
		return match && match.is_ended;
	};

	return (
		<Container fluid>
			<div className="list row">
				<div className="col">
					<Loading loading={loading}>
						{Error()}
						{Title()}
						{renderMatchDetails()}
						{isMatchEnded() ? renderReopenMatch() : renderEndMatch()}
					</Loading>
				</div>
			</div>
		</Container>
	);
}

export default Match;
