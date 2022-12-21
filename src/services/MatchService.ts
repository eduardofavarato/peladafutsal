import http from "../http-common";
import { IMatchEnd, IAddMatchPlayer } from "../types/Match";

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

const addPlayer = (matchId: number, data: IAddMatchPlayer, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addPlayer`, data, successCallback, errorCallback, onFinally);
};

const addGoal = (matchId: number, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/addGoal`, null, successCallback, errorCallback, onFinally);
};

const end = (matchId: number, data: IMatchEnd, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/end`, data, successCallback, errorCallback, onFinally);
};

const reopen = (matchId: number, successCallback?: any, errorCallback?: any, onFinally?: any) => {
	return processApiCall(http.post, `/v1/match/${matchId}/reopen`, null, successCallback, errorCallback, onFinally);
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
