import { IMatch } from "../types/Match";

export const extractDateFromMatch = (openMatch: IMatch | undefined) => {
	if (openMatch === undefined) return null;

	const matchDate = new Date(openMatch.match_date);

	return {
		formattedDate: () =>
			matchDate.toLocaleDateString("pt-BR", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			}),
	};
};
