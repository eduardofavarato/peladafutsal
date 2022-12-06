import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from "react-router-dom";
import Players from "./features/players/Players";

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/pelada/standings" className="navbar-brand">
					Classificação
				</a>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/pelada/players"} className="nav-link">
							Jogadores
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/pelada/match"} className="nav-link">
							Partida
						</Link>
					</li>
				</div>
			</nav>

			<div className="container mt-3">
				<Routes>
					{/* <Route path="pelada/" element={<Standings />} /> */}
					<Route path="/pelada/players" element={<Players />} />
					{/* <Route path="/pelada/match" element={<Match />} />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
