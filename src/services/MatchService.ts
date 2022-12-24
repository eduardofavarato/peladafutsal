import http from "../http-common";
import { IAddMatchPlayer, IMatchGoal, IRemoveMatchPlayer } from "../types/Match";

const processApiCall = (httpCall: any, url: string, data?: any, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	httpCall(url, data)
		.then((response: any) => {
			successCallback && successCallback(response);
			onFinally && onFinally();
		})
		.catch((e: Error) => {
			console.log(e);
			errorCallback && errorCallback(e);
			onFinally && onFinally();
		});
};

const create = (successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, "/v1/match", null, successCallback, errorCallback, onFinally);
};

const getTodaysMatch = (successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.get, "/v1/match/today", null, (response: any) => successCallback(response.data), errorCallback, onFinally);
};

const getAvailablePlayers = (matchId: number, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.get, `/v1/match/${matchId}/availablePlayers`, null, (response: any) => successCallback(response.data), errorCallback, onFinally);
};

const addPlayer = (matchId: number, data: IAddMatchPlayer, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addPlayer`, data, successCallback, errorCallback, onFinally);
};

const removePlayer = (matchId: number, data: IRemoveMatchPlayer, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/removePlayer`, data, successCallback, errorCallback, onFinally);
};

const addGoal = (matchId: number, data: IMatchGoal, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addGoal`, data, successCallback, errorCallback, onFinally);
};

const removeGoal = (matchId: number, data: IMatchGoal, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/removeGoal`, data, successCallback, errorCallback, onFinally);
};

const end = (matchId: number, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/end`, null, successCallback, errorCallback, onFinally);
};

const reopen = (matchId: number, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/reopen`, null, successCallback, errorCallback, onFinally);
};

const MatchService = {
	create,
	getTodaysMatch,
	getAvailablePlayers,
	addPlayer,
	removePlayer,
	addGoal,
	removeGoal,
	end,
	reopen,
};

export default MatchService;
