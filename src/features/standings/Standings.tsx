import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import StandingsService from "../../services/StandingsService";
import { IPlayerStatsData } from "../../types/Standings";
import Loading from "../loading/Loading";
import "./Standings.css";
import StandingsLegend from "./StandingsLegend";

function Standings() {
	const [loading, setLoading] = useState<boolean>(true);
	const [standings, setStandings] = useState<Array<IPlayerStatsData>>([]);

	useEffect(() => {
		StandingsService.get((data: any) => {
			setStandings(data);
			setLoading(false);
		});
	}, []);

	const renderStandings = () => {
		if (loading) {
			return;
		}

		return (
			<Table className="standings-table" size="sm" bordered responsive striped>
				<thead>
					<tr>
						<th>#</th>
						<th>NOME</th>
						<th>P</th>
						<th>J</th>
						<th>V</th>
						<th className="column-full-view-only">D</th>
						<th className="column-full-view-only">E</th>
						<th>G</th>
						<th className="column-full-view-only">APROVEITAMENTO</th>
					</tr>
				</thead>
				<tbody>
					{Array.from(standings).map((playerStats, index) => (
						<tr key={index} className={index < 2 ? "top-2" : ""}>
							<td>
								<b>{index + 1}º</b>
							</td>
							<td>{playerStats.player_name}</td>
							<td>{playerStats.total_points}</td>
							<td>{playerStats.total_games}</td>
							<td>{playerStats.total_wins}</td>
							<td className="column-full-view-only">{playerStats.total_losses}</td>
							<td className="column-full-view-only">{playerStats.total_draws}</td>
							<td>{playerStats.total_goals}</td>
							<td className="column-full-view-only">{playerStats.performance}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	return (
		<Container fluid>
			<div className="title my-2 ms-2">Classificação</div>
			<StandingsLegend></StandingsLegend>
			<Loading loading={loading}>{renderStandings()}</Loading>
		</Container>
	);
}

export default Standings;
