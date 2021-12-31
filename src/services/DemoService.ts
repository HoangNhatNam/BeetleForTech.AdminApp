import IDemoView from 'models/demo/IDemoView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IDemoView>>('/demo');
};

const get = (id: any) => {
  return http.get<IDemoView>(`/demo/${id}`);
};

const remove = (id: any) => {
  return http.delete<any>(`/demo/${id}`);
};

const DemoService = {
  getAll,
  get,
  remove,
};

export default DemoService;
