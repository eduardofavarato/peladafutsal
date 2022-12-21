import { ErrorMessages, Labels } from "./constants";

export const userHasAccess = () => {
	if (process.env.REACT_APP_DISABLE_PASSWORD) {
		return true;
	}

	const expected = "pelada" + new Date().getFullYear();
	const result = prompt(Labels.PASSWORD);

	if (result === null) {
		return;
	}

	if (result !== expected) {
		return alert(ErrorMessages.WRONG_PASSWORD);
	}

	return true;
};
