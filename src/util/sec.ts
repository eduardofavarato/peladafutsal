export const userHasAccess = () => {
	if (process.env.REACT_APP_DISABLE_PASSWORD) {
		return true;
	}

	const expected = "pelada" + new Date().getFullYear();
	const result = prompt("Senha:");

	if (result === null) {
		return;
	}

	if (result !== expected) {
		return alert("Senha incorreta!");
	}

	return true;
};
