import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
	return (
		<Navbar bg="light" expand="sm">
			<Container>
				<Navbar.Brand href="/standings">Pelada Futsal</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/standings">Classificação</Nav.Link>
						<Nav.Link href="/players">Jogadores</Nav.Link>
						<Nav.Link href="/match">Partida</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
