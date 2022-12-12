import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

test("renders navbar links", () => {
	render(<Header />, { wrapper: MemoryRouter });

	const standings = screen.getByText(/Classificação/i);
	const players = screen.getByText(/Jogadores/i);
	const match = screen.getByText(/Partida/i);

	expect(standings).toBeInTheDocument();
	expect(players).toBeInTheDocument();
	expect(match).toBeInTheDocument();
});
