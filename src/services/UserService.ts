import { IUser } from 'models/IUser';
import IUserCreate from 'models/user/IUserCreate';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IUser>>('/users/getall');
};

const getUser = () => {
  return http.get<Array<IUser>>('/users/getuser');
};

const get = (id: any) => {
  return http.get<IUser>(`/users/getall/${id}`);
};

const create = (data: any) => {
  return http.post('/users/register', data);
};

const update = (id: any, data: IUser) => {
  return http.put<any>(`/users/getall/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/users/${id}`);
};

const removeAll = () => {
  return http.delete<any>('/users/getall');
};

const findByTitle = (title: string) => {
  return http.get<Array<IUser>>(`/tutorials?title=${title}`);
};

const UserService = {
  getAll,
  get,
  getUser,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default UserService;
