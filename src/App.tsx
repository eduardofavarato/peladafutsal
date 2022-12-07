import { Link, Route, Routes } from "react-router-dom";
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

		// <div>
		// 	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		// 		<a href="/standings" className="navbar-brand">
		// 			Classificação
		// 		</a>
		// 		<button
		// 			className="navbar-toggler"
		// 			type="button"
		// 			data-toggle="collapse"
		// 			data-target="#navbarSupportedContent"
		// 			aria-controls="navbarSupportedContent"
		// 			aria-expanded="false"
		// 			aria-label="Toggle navigation"
		// 		>
		// 			<span className="navbar-toggler-icon"></span>
		// 		</button>

		// 		<div className="collapse navbar-collapse" id="navbarSupportedContent">
		// 			<ul className="navbar-nav mr-auto">
		// 				<li className="nav-item">
		// 					<Link to={"/players"} className="nav-link">
		// 						Jogadores
		// 					</Link>
		// 				</li>
		// 				<li className="nav-item">
		// 					<Link to={"/match"} className="nav-link">
		// 						Partida
		// 					</Link>
		// 				</li>
		// 			</ul>
		// 		</div>
		// 	</nav>

		// 	<div className="container mt-3">
		// 		<Routes>
		// 			{/* <Route path="/standings" element={<Standings />} /> */}
		// 			<Route path="/players" element={<Players />} />
		// 			{/* <Route path="/match" element={<Match />} />} /> */}
		// 		</Routes>
		// 	</div>
		// </div>
	);
}

export default App;
