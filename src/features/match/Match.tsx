import { useState, useEffect } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import MatchService from "../../services/MatchService";
import { IMatch } from "../../types/Match";
import CreateMatch from "./CreateMatch";
import "./Match.css";
import { ErrorMessages } from "../../util/constants";
import MatchDetails from "./MatchDetails";
import Loading from "../loading/Loading";
import { extractDateFromMatch } from "../../util/dates";
import ErrorAlert from "../error-alert/ErrorAlert";

function Match() {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [match, setMatch] = useState<IMatch>();

	const matchDate = extractDateFromMatch(match);

	useEffect(() => {
		const handleError = (error: any) => {
			if (error && error.response && error.response.status === 404) return;
			setError(true);
		};

		MatchService.getTodaysMatch(setMatch, handleError, () => setLoading(false));
	}, []);

	const createMatch = () => {
		const onSuccess = (response: any) => {
			if (response.status === 200) {
				MatchService.getTodaysMatch(setMatch);
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

	const handleError = () => {
		return error && <ErrorAlert dismiss={() => setError(false)}></ErrorAlert>;
	};

	const renderTitle = () => {
		if (!match) {
			return <CreateMatch createMatch={createMatch}></CreateMatch>;
		}

		return <h2>{`Partida: ${matchDate && matchDate.formattedDate()}`}</h2>;
	};

	const renderMatch = () => {
		if (loading) {
			return;
		}

		if (match === undefined) {
			return;
		}

		return <MatchDetails match={match}></MatchDetails>;
	};

	return (
		<Container fluid>
			<div className="list row">
				<div className="col-lg-6">
					<div className="my-3 ps-2">
						<Loading loading={loading}>
							{renderTitle()}
							{handleError()}
							{renderMatch()}
						</Loading>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Match;
