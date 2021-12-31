import IPartnerView from 'models/partner/IPartnerView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IPartnerView>>('/partner');
};

const get = (id: any) => {
  return http.get<IPartnerView>(`/partner/${id}`);
};

const create = (data: any) => {
  return http.post('/partner', data);
};

const update = (data: any) => {
  return http.put<any>('/partner/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/partner/${id}`);
};

const PartnerService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PartnerService;
