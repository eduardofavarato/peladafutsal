import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MatchService from "../../services/MatchService";
import { IMatch } from "../../types/Match";
import { extractDateFromMatch } from "../../util/dates";
import CreateMatch from "./CreateMatch";
import "./Match.css";

function Match() {
	const [match, setMatch] = useState<IMatch>();

	const openMatchDate = extractDateFromMatch(match);

	useEffect(() => {
		MatchService.getTodaysMatch(setMatch);
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
					alert("Não é possível criar mais de uma partida por dia");
				}
			}
		};

		MatchService.create(onSuccess, onError);
	};

	return (
		<Container fluid>
			<div className="list row">
				<div className="col-lg-6">
					<div className="text-center my-3 ml-2">
						{openMatchDate && <h2>{`Partida: ${openMatchDate.formattedDate()}`}</h2>}
						<CreateMatch createMatch={createMatch} invisible={!!match}></CreateMatch>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Match;
