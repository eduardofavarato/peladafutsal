import http from "../http-common";
import { IMatchEnd, IAddMatchPlayer } from "../types/Match";

const processApiCall = (httpCall: any, url: string, data?: any, successCallback?: any, errorCallback?: any) => {
	httpCall(url, data)
		.then((response: any) => {
			console.log(response);
			successCallback && successCallback(response);
		})
		.catch((e: Error) => {
			console.log(e);
			errorCallback && errorCallback(e);
		});
};

const create = (successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, "/v1/match", null, successCallback, errorCallback);
};

const getTodaysMatch = (successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.get, "/v1/match/today", null, (response: any) => successCallback(response.data), errorCallback);
};

const addPlayer = (matchId: number, data: IAddMatchPlayer, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addPlayer`, data, successCallback, errorCallback);
};

const addGoal = (matchId: number, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addGoal`, null, successCallback, errorCallback);
};

const end = (matchId: number, data: IMatchEnd, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/end`, data, successCallback, errorCallback);
};

const reopen = (matchId: number, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/reopen`, null, successCallback, errorCallback);
};

const MatchService = {
	create,
	getTodaysMatch,
	addPlayer,
	addGoal,
	end,
	reopen,
};

export default MatchService;
