import http from "../http-common";
import IPlayerData from "../types/Player";

const getAll = () => {
	return http.get<Array<IPlayerData>>("/v1/players");
};

const get = (id: any) => {
	return http.get<IPlayerData>(`/v1/players/${id}`);
};

const create = (data: IPlayerData) => {
	return http.post<IPlayerData>("/players", data);
};

const update = (id: any, data: IPlayerData) => {
	return http.put<any>(`/v1/players/${id}`, data);
};

const remove = (id: any) => {
	return http.delete<any>(`/v1/players/${id}`);
};

const removeAll = () => {
	return http.delete<any>(`/v1/players`);
};

const findByName = (name: string) => {
	return http.get<Array<IPlayerData>>(`/v1/players?name=${name}`);
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
