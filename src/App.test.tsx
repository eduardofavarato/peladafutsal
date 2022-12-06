import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders standings link", () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const standings = screen.getByText(/Classificação/i);
	expect(standings).toBeInTheDocument();
});

test("renders players link", () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const players = screen.getByText(/Jogadores/i);
	expect(players).toBeInTheDocument();
});

test("renders match link", () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const match = screen.getByText(/Partida/i);
	expect(match).toBeInTheDocument();
});
