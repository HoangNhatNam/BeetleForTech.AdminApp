import IApplicationUpdate from 'models/application/IApplicationUpdate';
import IApplicationView from '../models/application/IApplicationView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IApplicationView>>('/Application');
};

const get = (id: any) => {
  return http.get<IApplicationView>(`/Application/${id}`);
};

const getUpdate = (id: any) => {
  return http.get<IApplicationUpdate>(`/Application/update/${id}`);
};

const create = (data: any) => {
  return http.post('/Application', data);
};

const update = (data: any) => {
  return http.put<any>('/Application/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/Application/${id}`);
};

const ApplicationService = {
  getAll,
  get,
  getUpdate,
  create,
  update,
  remove,
};

export default ApplicationService;
