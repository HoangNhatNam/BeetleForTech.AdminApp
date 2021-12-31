import IToolsManages from 'models/toolsManages/IToolsMana';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IToolsManages>>('/toolsmanages');
};

const get = (id: any) => {
  return http.get<IToolsManages>(`/toolsmanages/${id}`);
};

const create = (data: any) => {
  return http.post('/toolsmanages', data);
};

const update = (data: any) => {
  return http.put<any>('/toolsmanages/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/toolsmanages/${id}`);
};

const ToolsManaService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ToolsManaService;
