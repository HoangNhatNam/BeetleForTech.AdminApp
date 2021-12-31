import IContactView from 'models/contact/IContactView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IContactView>>('/contact');
};

const get = (id: any) => {
  return http.get<IContactView>(`/contact/${id}`);
};

const remove = (id: any) => {
  return http.delete<any>(`/contact/${id}`);
};

const ContactService = {
  getAll,
  get,
  remove,
};

export default ContactService;
