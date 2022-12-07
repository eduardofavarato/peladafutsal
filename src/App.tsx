import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Players from "./features/players/Players";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div>
			<NavBar />

			<div className="container mt-3">
				<Routes>
					{/* <Route path="/standings" element={<Standings />} /> */}
					<Route path="/players" element={<Players />} />
					{/* <Route path="/match" element={<Match />} />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
