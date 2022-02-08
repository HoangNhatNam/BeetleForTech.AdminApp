import IManagerView from '../models/manager/IManagerView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IManagerView>>('/manager');
};

const get = (id: any) => {
  return http.get<IManagerView>(`/manager/${id}`);
};

const create = (data: any) => {
  return http.post('/manager', data);
};

const update = (data: any) => {
  return http.put<any>('/manager/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/manager/${id}`);
};

const ManagerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ManagerService;
