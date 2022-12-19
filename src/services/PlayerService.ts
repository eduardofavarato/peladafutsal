import http from "../http-common";
import IPlayerData from "../types/Players";

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

const getAll = (successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.get, "/v1/players", null, (response: any) => successCallback(response.data), errorCallback);
};

const get = (id: any, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.get, `/v1/players/${id}`, null, successCallback, errorCallback);
};

const create = (data: IPlayerData, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.post, "/v1/players", data, successCallback, errorCallback);
};

const update = (id: any, data: IPlayerData, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.put, `/v1/players/${id}`, data, successCallback, errorCallback);
};

const remove = (id: any, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.delete, `/v1/players/${id}`, null, successCallback, errorCallback);
};

const removeAll = (successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.delete, `/v1/players`, null, successCallback, errorCallback);
};

const findByName = (name: string, successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.get, `/v1/players?name=${name}`, null, successCallback, errorCallback);
};

const PlayerService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByName,
};

export default PlayerService;
