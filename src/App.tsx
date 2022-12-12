import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Navigation from "./features/navigation/Navigation";
import Players from "./features/players/Players";

function App() {
	const [currentTab, setCurrentTab] = useState("standings");

	const renderTab = () => {
		switch (currentTab) {
			case "standings":
				return <div>under development ...</div>;
			case "players":
				return <Players />;
			case "match":
				return <div>under development ...</div>;
			default:
				return null;
		}
	};

	return (
		<div>
			<Container fluid className="p-0">
				<Navigation currentTab={currentTab} setCurrentTab={setCurrentTab}></Navigation>
			</Container>
			<Container fluid>
				<main>{renderTab()}</main>
			</Container>
		</div>
	);
}

export default App;
