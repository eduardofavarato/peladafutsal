import { IMatch } from "../types/Match";

const addHours = (date: Date, hours: number) => {
	date.setHours(date.getHours() + hours);

	return date;
};

export const extractDateFromMatch = (openMatch: IMatch | undefined) => {
	if (openMatch === undefined) return null;

	const matchDate = addHours(new Date(openMatch.match_date), 12);

	return {
		formattedDate: () =>
			matchDate.toLocaleDateString("pt-BR", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			}),
	};
};
