import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../assets/images/logo.jpg";

interface NavigationProps {
	currentTab: string;
	setCurrentTab: (tab: string) => void;
}

function Navigation(props: NavigationProps) {
	const { currentTab, setCurrentTab } = props;

	const test = (eventKey: string | null, e: React.SyntheticEvent<unknown>) => {
		setCurrentTab(eventKey || "standings");
	};

	return (
		<Container fluid className="p-0">
			<Navbar collapseOnSelect bg="dark" variant="dark" className="px-2 p-sm-0" id="navbar-collapse-id" expand="sm">
				<Container>
					<Navbar.Brand onClick={() => setCurrentTab("standings")} className="mb-0 h1">
						<img src={logo} width="30" height="30" className="img-fluid d-inline-block align-top rounded-circle mr-2" alt=""></img>
						Pelada Futsal
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav px-3 px-sm-1 px-md-0" />

					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav activeKey={currentTab} onSelect={test} className="px-3 px-sm-1 px-md-0">
							<Nav.Item>
								<Nav.Link onClick={() => setCurrentTab("standings")} eventKey="standings">
									Classificação
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link onClick={() => setCurrentTab("players")} eventKey="players">
									Jogadores
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link onClick={() => setCurrentTab("match")} eventKey="match">
									Partida
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Container>
	);
}

export default Navigation;
