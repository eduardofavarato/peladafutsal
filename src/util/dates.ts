import { IMatch } from "../types/Match";

export const extractDateFromMatch = (openMatch: IMatch | undefined) => {
	if (openMatch === undefined) return null;

	const matchDate = new Date(openMatch.match_date);

	return {
		formattedDate: () => `${matchDate.getDate()}/${matchDate.getMonth()}/${matchDate.getFullYear()}`,
	};
};
