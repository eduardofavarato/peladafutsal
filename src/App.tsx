import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Navigation from "./features/navigation/Navigation";
import Players from "./features/players/Players";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div>
			<Container fluid className="p-0">
				<Navigation />
			</Container>

			<Routes>
				<Route path="/" element={<div>under development ...</div>} />
				<Route path="/players" element={<Players />} />
				<Route path="/match" element={<div>under development ...</div>} />
			</Routes>
		</div>
	);
}

export default App;
