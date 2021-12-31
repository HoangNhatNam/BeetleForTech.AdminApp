import ICategoryView from 'models/ICategoryView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<ICategoryView>>('/category');
};

const get = (id: any) => {
  return http.get<ICategoryView>(`/category/${id}`);
};

const create = (data: any) => {
  return http.post('/category', data);
};

const update = (data: any) => {
  return http.put<any>('/category/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/category/${id}`);
};

const CategoryService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CategoryService;
