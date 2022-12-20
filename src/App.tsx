import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Players from "./features/players/Players";
import { Route, Routes } from "react-router-dom";
import Header from "./features/header/Header";
import Standings from "./features/standings/Standings";
import Match from "./features/match/Match";

function App() {
	return (
		<div>
			<Container fluid className="p-0">
				<Header />
			</Container>

			<Routes>
				<Route path="/" element={<Standings />} />
				<Route path="/players" element={<Players />} />
				<Route path="/match" element={<Match />} />
			</Routes>
		</div>
	);
}

export default App;
