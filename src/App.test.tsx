import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar links", () => {
	render(<App />);

	const standings = screen.getByText(/Classificação/i);
	const players = screen.getByText(/Jogadores/i);
	const match = screen.getByText(/Partida/i);

	expect(standings).toBeInTheDocument();
	expect(players).toBeInTheDocument();
	expect(match).toBeInTheDocument();
});
