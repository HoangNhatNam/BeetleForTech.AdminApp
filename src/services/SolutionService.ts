import ISolutionView from '../models/solution/ISolutionView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<ISolutionView>>('/solution');
};

const get = (id: any) => {
  return http.get<ISolutionView>(`/solution/${id}`);
};

const create = (data: any) => {
  return http.post('/solution', data);
};

const update = (data: any) => {
  return http.put<any>('/solution/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/solution/${id}`);
};

const SolutionService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default SolutionService;
