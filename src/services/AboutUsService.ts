import IAboutView from '../models/about/IAboutView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IAboutView>>('/AboutUs');
};

const get = (id: any) => {
  return http.get<IAboutView>(`/AboutUs/${id}`);
};

const create = (data: any) => {
  return http.post('/AboutUs', data);
};

const update = (data: any) => {
  return http.put<any>('/AboutUs/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/AboutUs/${id}`);
};

const AboutUsService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default AboutUsService;
