import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Players from "./features/players/Players";
import { Route, Routes } from "react-router-dom";
import Header from "./features/header/Header";

function App() {
	return (
		<div>
			<Container fluid className="p-0">
				<Header />
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
