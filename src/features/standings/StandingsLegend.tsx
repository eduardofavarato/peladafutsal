import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StandingsLegend.css";
import { useState } from "react";

function StandingsLegend() {
	const [show, setShow] = useState<boolean>(false);
	const icon = show ? faMinus : faPlus;

	const toggleLegend = () => {
		setShow(!show);
	};

	return (
		<div className="legend-container">
			<Button variant="secondary" onClick={() => toggleLegend()} className="stadings-legend-button">
				<FontAwesomeIcon icon={icon} /> Legenda
			</Button>
			{show && (
				<div className="legend-text">
					<div className="legend-small-view">P: Pontos | J: Jogos | V: Vitórias | G: Gols</div>
					<div className="legend-full-view">P: Pontos | J: Jogos | V: Vitórias | D: Derrotas | E: Empates | G: Gols</div>
				</div>
			)}
		</div>
	);
}

export default StandingsLegend;
