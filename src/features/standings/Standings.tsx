import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import StandingsService from "../../services/StandingsService";
import IPlayerStatsData from "../../types/Standings";
import "./Standings.css";

function Standings() {
	const [standings, setStandings] = useState<Array<IPlayerStatsData>>([]);

	useEffect(() => {
		StandingsService.get(setStandings);
	}, []);

	return (
		<Container fluid>
			<div className="list row">
				<div className="col-lg-6">
					<h2 className="my-4 ml-2">Classificação</h2>
					<Table className="table" size="sm" bordered responsive striped>
						<thead>
							<tr>
								<th>#</th>
								<th>NOME</th>
								<th>PONTOS</th>
								<th>JOGOS</th>
								<th>VITÓRIAS</th>
								<th>DERROTAS</th>
								<th>EMPATES</th>
								<th>APROVEITAMENTO</th>
								<th>GOLS</th>
							</tr>
						</thead>
						<tbody>
							{Array.from(standings).map((playerStats, index) => (
								<tr key={index} className={index < 2 ? "top-2" : ""}>
									<td>
										<b>{index}º</b>
									</td>
									<td>{playerStats.player_name}</td>
									<td>{playerStats.total_points}</td>
									<td>{playerStats.total_games}</td>
									<td>{playerStats.total_wins}</td>
									<td>{playerStats.total_losses}</td>
									<td>{playerStats.total_draws}</td>
									<td>{playerStats.performance}</td>
									<td>{playerStats.total_goals}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</Container>
	);
}

export default Standings;
