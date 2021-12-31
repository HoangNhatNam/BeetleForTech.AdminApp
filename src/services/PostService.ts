import IPostView from 'models/IPostView';
import http from './http-common';

const getAll = () => {
  return http.get<Array<IPostView>>('/posts');
};

const get = (id: any) => {
  return http.get<IPostView>(`/posts/${id}`);
};

const getUpdate = (id: any) => {
  return http.get<IPostView>(`/posts/update/${id}`);
};

const create = (data: any) => {
  return http.post('/posts', data);
};

const update = (data: any) => {
  return http.put<any>('/posts/', data);
};

const remove = (id: any) => {
  return http.delete<any>(`/posts/${id}`);
};

const removeAll = () => {
  return http.delete<any>('/posts');
};

const findByTitle = (title: string) => {
  return http.get<Array<IPostView>>(`/tutorials?title=${title}`);
};

const PostService = {
  getAll,
  get,
  getUpdate,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default PostService;
