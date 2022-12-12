export const isPlayerNameValid = (playerName: string) => {
	return !!playerName && playerName.length < 50;
};
