import http from "../http-common";

const processApiCall = (httpCall: any, url: string, data?: any, successCallback?: any, errorCallback?: any) => {
	httpCall(url, data)
		.then((response: any) => {
			successCallback && successCallback(response);
		})
		.catch((e: Error) => {
			console.log(e);
			errorCallback && errorCallback(e);
		});
};

const get = (successCallback?: any, errorCallback?: any) => {
	return processApiCall(http.get, "/v1/standings", null, (response: any) => successCallback(response.data), errorCallback);
};

const StandingsService = {
	get,
};

export default StandingsService;
